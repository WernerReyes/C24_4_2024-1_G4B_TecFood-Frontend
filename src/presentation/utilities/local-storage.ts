export const StorageKeys = {
  TOKEN: "token",
  ORDER_DISH_FILTERS: "orderDishFilters",
  DISH_FILTERS: "dishFilters",
  DISHES_TO_SEARCH: "dishesToSearch",
  HISTORY_SEARCH: "historySearch",
  DISH_TO_SEARCH: "dishToSearch",
  ORDER_DISH: "orderDish",
  CHAT_MESSAGES: "chatMessages",
  THEME: "theme",
};

export const setStorage = <T>(key: string, value: T) => {
  localStorage.setItem(key, JSON.stringify(value));
};
export const getStorage = <T>(key: string): T | null => {
  const value = localStorage.getItem(key);
  if (!value) return null;
  try {
    return JSON.parse(value);
  } catch (error) {
    return value as T;
  }
};
export const removeStorage = (key: string) => localStorage.removeItem(key);

export const clearStorage = () => {
  Object.values(StorageKeys)
    .filter((key) => key !== StorageKeys.THEME)
    .forEach((key) => removeStorage(key));
};
