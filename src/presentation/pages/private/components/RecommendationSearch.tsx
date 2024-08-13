import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import type { DishModel } from "@/model";
import { useEffect, useState } from "react";
import { StorageKeys, setStorage } from "@/presentation/utilities";
import { PrivateRoutes } from "@/presentation/routes";
import { HighlightedText } from "@/presentation/pages/private/components";
import { useAuthStore } from "@/presentation/hooks";

const { HISTORY_SEARCH } = StorageKeys;

const {
  common: { DETAIL_DISH },
} = PrivateRoutes;

type Props = {
  recommendations: DishModel[];
  historySearch: { id: number; name: string }[];
  search: string;
  setEnterPressed: (enterPressed: boolean) => void;
};

export const RecommendationSearch = ({
  recommendations,
  setEnterPressed,
  historySearch,
  search,
}: Props) => {
  const navigate = useNavigate();
  const { authenticatedUser } = useAuthStore();
  const [hoverName, setHoverName] = useState(recommendations[0].name);
  const [lastEventWasKeyboard, setLastEventWasKeyboard] = useState(false);

  const handleSaveHistorySearch = (dish: DishModel) => {
    if (!historySearch.find((h) => h.name === dish.name)) {
      if (historySearch.length >= 7) historySearch.pop();
      setStorage(HISTORY_SEARCH, [
        { id: dish.id, name: dish.name },
        ...historySearch,
      ]);
    }
    setEnterPressed(true);
    navigate(DETAIL_DISH(authenticatedUser.role, dish.id));
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
                "group flex cursor-pointer justify-between border-b p-4 text-sm dark:border-slate-700 ",
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
            </li>
          ))
        ) : (
          <i className="text-center text-gray-400">No recent searches</i>
        )}
      </ul>
    </>
  );
};
