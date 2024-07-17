const USER_BASE = "/user";
const ADMIN_BASE = "/admin";

export type IPrivateRoutes = {
  USER: string;
  user: {
    HOME: string;
    DISHES: string;
    PROFILE: string;
    CART: string;
    ORDER_HISTORY: string;
    PAYMENT: string;
  };
  ADMIN: string;
  admin: {
    HOME: string;
    PROFILE: string;
    ADD_DISH: string;
    DISHES_LIST: string;
  };
};

export const PrivateRoutes: IPrivateRoutes = {
  // <-- USER ROUTES -->
  USER: USER_BASE,
  user: {
    HOME: "home",
    DISHES: "dishes",
    PROFILE: "profile",
    CART: "cart",
    ORDER_HISTORY: "order-history",
    PAYMENT: "payment",
  },

  // <-- ADMIN ROUTES -->
  ADMIN: ADMIN_BASE,
  admin: {
    HOME: "home",
    PROFILE: "profile",
    ADD_DISH: "add-dish",
    DISHES_LIST: "dishes-list",
  },
};
