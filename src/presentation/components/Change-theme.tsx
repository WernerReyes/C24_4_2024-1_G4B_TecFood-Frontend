import { useEffect } from "react";
import clsx from "clsx";
import { useTheme } from "../hooks";

export const ChangeTheme = () => {
  const { currentTheme, startChangingTheme, startLoadTheme } = useTheme();

  const handleChangeTheme = () => startChangingTheme(currentTheme);

  useEffect(() => {
    startLoadTheme(currentTheme);
  }, []);

  return (
    <i
      onClick={handleChangeTheme}
      className={clsx(
        "pi me-5 cursor-pointer text-black hover:text-primary dark:text-white dark:hover:text-primary",
        currentTheme === "dark" ? "pi-moon" : "pi-sun",
      )}
    ></i>
  );
};
