export const regularExpressions = {
  EMAIL: /^[A-Za-z0-9+_.-]+@tecsup\.edu\.pe$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
  DNI: /^\d{8}$/,
  PHONE: /^\d{9}$/,
  URL: /^https?:\/\/[a-z0-9-]+(\.[a-z0-9-]+)+(:\d{1,5})?(\/.*)?$/i,
};
