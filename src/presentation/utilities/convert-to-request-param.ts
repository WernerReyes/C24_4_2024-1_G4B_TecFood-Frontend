interface IndexableType {
  [key: string]: any;
}
export const convertToRequestParam = (object: IndexableType): string => {
  if (object === null || object === undefined) return "";
  if (Object.keys(object).length === 0) return "";
  return (
    "?" +
    Object.keys(object)
      .map((key) => {
        if (object[key] === null || object[key] === undefined) return "";
        return `${key}=${object[key]}`;
      })
      .join("&")
  );
};
