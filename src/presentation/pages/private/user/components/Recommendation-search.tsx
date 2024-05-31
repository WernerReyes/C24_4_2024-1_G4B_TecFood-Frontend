import clsx from "clsx";
import { DishModel } from "@/model";
import { HighlightedText } from "../../components";
import { Link } from "@/presentation/components";
import { useEffect, useState } from "react";
import { fromStringToUrl, setStorage } from "@/presentation/utilities";
import { PrivateRoutes } from "@/presentation/routes";

const {
  USER,
  user: {  DETAIL_DISH },
} = PrivateRoutes;


type Props = {
  recommendations: DishModel[];
  historySearch: string[];
  search: string;
  setEnterPressed: (enterPressed: boolean) => void;
};

export const RecommendationSearch = ({
  recommendations,
  setEnterPressed,
  historySearch,
  search,
}: Props) => {
  const [hoverName, setHoverName] = useState(recommendations[0].name);
  const [lastEventWasKeyboard, setLastEventWasKeyboard] = useState(false);

  const handleSaveHistorySearch = (dish: DishModel) => {
    if (!historySearch.includes(dish.name)) {
      if (historySearch.length >= 7) historySearch.pop();
      setStorage("historySearch", [dish.name, ...historySearch]);
      setEnterPressed(true);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        setLastEventWasKeyboard(true);
        const index = recommendations.findIndex(
          (dish) => dish.name === hoverName,
        );
        if (e.key === "ArrowDown" && index < recommendations.length - 1) {
          setHoverName(recommendations[index + 1].name);
        } else if (e.key === "ArrowUp" && index > 0) {
          setHoverName(recommendations[index - 1].name);
        }
      } else if (e.key === "Enter") {
        const dish = recommendations.find((dish) => dish.name === hoverName);
        if (dish) {
          handleSaveHistorySearch(dish);
          window.location.href = `${USER}/${ DETAIL_DISH}/${fromStringToUrl(
            dish.name,
          )}`;
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [hoverName]);

  return (
    <>
      <p
        className={clsx(
          "mt-5 text-primary",
          recommendations.length ? "block" : "hidden",
        )}
      >
        Recomendations
      </p>

      <ul
        className={clsx(
          "mt-2 min-h-20 w-full",
          !recommendations.length && "flex items-center justify-center",
        )}
      >
        {recommendations.length ? (
          recommendations.map((dish) => (
            <li
              key={dish.id}
              className={clsx(
                "group cursor-pointer border-b p-4 text-sm dark:border-slate-700 ",
                hoverName === dish.name &&
                  "rounded-md bg-primary text-white dark:text-black",
              )}
              onMouseEnter={() => {
                if (!lastEventWasKeyboard) {
                  setHoverName(dish.name);
                }
              }}
              onClick={() => handleSaveHistorySearch(dish)}
              onMouseMove={() => setLastEventWasKeyboard(false)}
            >
              <Link
                to={`${USER}/${ DETAIL_DISH}/${fromStringToUrl(dish.name)}`}
                className="flex justify-between"
                unstyled
              >
                <div className="flex items-center">
                  <i className="pi pi-file me-2"></i>
                  <HighlightedText
                    text={dish.name}
                    highlight={search}
                    selected={hoverName}
                  />
                </div>
                <div className="flex items-center">
                  <i className="pi pi-arrow-left"></i>
                </div>
              </Link>
            </li>
          ))
        ) : (
          <i className="text-center text-gray-400">No recent searches</i>
        )}
      </ul>
    </>
  );
};
