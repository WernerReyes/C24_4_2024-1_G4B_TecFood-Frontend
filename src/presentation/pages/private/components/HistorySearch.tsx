import { useEffect, useState } from "react";
import clsx from "clsx";
import { PrivateRoutes } from "@/presentation/routes";
import { StorageKeys, setStorage } from "@/presentation/utilities";
import { useNavigate } from "react-router-dom";


const { HISTORY_SEARCH } = StorageKeys;

const {
  USER,
  user: { DISHES },
} = PrivateRoutes;

type Props = {
  histories: { id: number; name: string }[];
  setHistorySearch: (history: { id: number; name: string }[]) => void;
  setEnterPressed: (value: boolean) => void;
};

export const HistorySearch = ({
  histories,
  setEnterPressed,
  setHistorySearch,
}: Props) => {
  const navigate = useNavigate();
  const [hoverHistory, setHoverHistory] = useState(histories[0]?.name);
  const [lastEventWasKeyboard, setLastEventWasKeyboard] = useState(false);

  const handleDelete = (id: number) => {
    const newHistory = histories.filter((h) => h.id !== id);
    setHistorySearch(newHistory);
    setStorage(HISTORY_SEARCH, newHistory);
  };

  const handleNavigate = (id: number) => {
    navigate(`${USER}/${DISHES}/${id}`);
    setEnterPressed(true);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        setLastEventWasKeyboard(true);
        const index = histories.findIndex(
          (history) => history.name === hoverHistory,
        );
        if (e.key === "ArrowDown" && index < histories.length - 1) {
          setHoverHistory(histories[index + 1].name);
        } else if (e.key === "ArrowUp" && index > 0) {
          setHoverHistory(histories[index - 1].name);
        }
      } else if (e.key === "Enter") {
        const history = histories.find(
          (history) => history.name === hoverHistory,
        );
        if (history) {
          handleNavigate(history.id);
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
          histories.map((history, key) => (
            <li
              key={key}
              className={clsx(
                "group border-b p-4 text-sm dark:border-slate-700 ",
                hoverHistory === history.name &&
                  "rounded-md bg-primary text-white dark:text-black",
              )}
              onMouseEnter={() => {
                if (!lastEventWasKeyboard) {
                  setHoverHistory(history.name);
                }
              }}
              onMouseMove={() => setLastEventWasKeyboard(false)}
            >
              <div className="flex justify-between">
                <div
                  className="w-full cursor-pointer"
                  onClick={() => handleNavigate(history.id)}
                >
                  <i className="pi pi-history me-2"></i>
                  <span>{history.name}</span>
                </div>
                <div className="flex items-center">
                  <i className="pi pi-star me-2"></i>
                  <i
                    onClick={() => handleDelete(history.id)}
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
