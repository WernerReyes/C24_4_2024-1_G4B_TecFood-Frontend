export const fromObjectToArray = <T>(object: Record<string, T>) => {
  return Object.values(object).map((value) => value) as T[];
};
