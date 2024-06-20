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

export const clearStorage = () => localStorage.clear();
