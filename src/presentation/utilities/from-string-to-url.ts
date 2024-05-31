export const fromStringToUrl = (url: string): string => {
  return url.replace(/\s/g, "-").toLowerCase();
};

export const fromUrlToString = (url: string): string => {
  return url.replace(/-/g, " ").toLowerCase();
};
