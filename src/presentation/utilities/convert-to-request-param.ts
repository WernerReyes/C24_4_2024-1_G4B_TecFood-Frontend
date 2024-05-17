export const convertToRequestParam = <T>(object: T) => {
  if (Object.keys(object).length === 0) return "";
  return '?' + Object.keys(object)
    .map((key) => {
      return `${key}=${object[key]}`;
    })
    .join("&");
};
