export const convertToRequestParam = <T>(object: Record<string, T>): string => {
  if (Object.keys(object).length === 0) return "";
  return (
    "?" +
    Object.keys(object)
      .map((key) => {
        if(object[key] === null) return "";
        return `${key}=${object[key]}`;
      })
      .join("&")
  );
};
