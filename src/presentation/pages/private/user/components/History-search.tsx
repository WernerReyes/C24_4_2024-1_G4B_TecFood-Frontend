import { Link } from "@/presentation/components";
import { PrivateRoutes } from "@/presentation/routes";
import { fromStringToUrl, setStorage } from "@/presentation/utilities";
import clsx from "clsx";
import { useEffect, useState } from "react";

const {
  USER,
  user: {  DETAIL_DISH },
} = PrivateRoutes;

type Props = {
  histories: string[];
  setHistorySearch: (history: string[]) => void;
};

export const HistorySearch = ({ histories, setHistorySearch }: Props) => {
  const [hoverHistory, setHoverHistory] = useState(histories[0]);
  const [lastEventWasKeyboard, setLastEventWasKeyboard] = useState(false);

  const handleDelete = (name: string) => {
    const newHistory = histories.filter((h) => h !== name);
    setHistorySearch(newHistory);
    setStorage("historySearch", newHistory);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        setLastEventWasKeyboard(true);
        const index = histories.findIndex(
          (history) => history === hoverHistory,
        );
        if (e.key === "ArrowDown" && index < histories.length - 1) {
          setHoverHistory(histories[index + 1]);
        } else if (e.key === "ArrowUp" && index > 0) {
          setHoverHistory(histories[index - 1]);
        }
      } else if (e.key === "Enter") {
        const history = histories.find((history) => history === hoverHistory);
        if (history) {
          window.location.href = `${USER}/${ DETAIL_DISH}/${fromStringToUrl(
            history,
          )}`;
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [hoverHistory]);

  return (
    <>
      <p
        className={clsx(
          "mt-5 text-primary",
          history.length ? "block" : "hidden",
        )}
      >
        Recent
      </p>

      <ul
        className={clsx(
          "mt-2 min-h-20 w-full",
          !histories.length && "flex items-center justify-center",
        )}
      >
        {histories.length ? (
          histories.map((name, key) => (
            <li
              key={key}
              className={clsx(
                "group border-b p-4 text-sm dark:border-slate-700 ",
                hoverHistory === name &&
                  "rounded-md bg-primary text-white dark:text-black",
              )}
              onMouseEnter={() => {
                if (!lastEventWasKeyboard) {
                  setHoverHistory(name);
                }
              }}
              onMouseMove={() => setLastEventWasKeyboard(false)}
            >
              <div className="flex justify-between">
                <Link
                  to={`${USER}/${ DETAIL_DISH}/${fromStringToUrl(name)}`}
                  unstyled
                  className="cursor-pointe w-full"
                >
                  <i className="pi pi-history me-2"></i>
                  <span>{name}</span>
                </Link>
                <div className="flex items-center">
                  <i className="pi pi-star me-2"></i>
                  <i
                    onClick={() => handleDelete(name)}
                    className="pi pi-times ml-2"
                  ></i>
                </div>
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
