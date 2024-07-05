export const formatNumber = (num: number): string =>
  Number.isInteger(num) ? `${num}.0` : num.toString();
