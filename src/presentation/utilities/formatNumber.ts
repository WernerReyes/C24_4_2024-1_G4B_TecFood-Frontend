export const formatNumber = (num: number): string =>
  Number.isInteger(num) ? `${num}.0` : num.toString();

export const formatCurrency = (value: number) => {
  return value.toLocaleString("pe-PE", {
    style: "currency",
    currency: "PEN",
  });
};
