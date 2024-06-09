import { AppState, changeTheme } from "@/infraestructure/store";
import { useDispatch, useSelector } from "react-redux";
import { setStorage } from "../../utilities";

const localStorageTheme = (theme: string) => {
  if (theme === "light") {
    document.querySelector("html")?.classList.remove("dark");
    setStorage("theme", "light");
  } else {
    document.querySelector("html")?.classList.add("dark");
    setStorage("theme", "dark");
  }
  document.querySelector("#theme-link")?.setAttribute("href", `/themes/lara-${theme}-cyan/theme.css`);
};

export const useThemeStore = () => {
  const dispatch = useDispatch();

  const { currentTheme } = useSelector((state: AppState) => state.themes);

  const startChangingTheme = (theme: string) => {
    const newTheme =
      theme === "dark" ||
      (!theme && window.matchMedia("(prefers-color-scheme: dark)").matches)
        ? "light"
        : "dark";
    dispatch(changeTheme(newTheme));
    localStorageTheme(newTheme);
  };

  const startLoadTheme = (theme: string) => {
    document.querySelector("html")?.classList.toggle(theme, theme === "dark");
    document.querySelector("#theme-link")?.setAttribute("href", `/themes/lara-${theme}-cyan/theme.css`);
  };

  return {
    //* Attributes
    currentTheme,
    isDark: currentTheme === "dark",

    //* Methods
    startChangingTheme,
    startLoadTheme,
  };
};
