const USER_BASE = "/user";
const ADMIN_BASE = "/admin";

export type IPrivateRoutes = {
  USER: string;
  user: {
    HOME: string;
    DISHES: string;
    CART: string;
    ORDER_HISTORY: string;
    PAYMENT: string;
  };
  ADMIN: string;
  admin: {
    HOME: string;
    ADD_DISH: string;
    VIEW_DISH: (id?: number) => string;
    EDIT_DISH: (id?: number) => string;
    LIST_DISHES: string;
  };

  common: {
    HOME: string;
    PROFILE: string;
  };

};

export const PrivateRoutes: IPrivateRoutes = {
  // <-- USER ROUTES -->
  USER: USER_BASE,
  user: {
    HOME: "home",
    DISHES: "dishes",
    CART: "cart",
    ORDER_HISTORY: "order-history",
    PAYMENT: "payment",
  },

  // <-- ADMIN ROUTES -->
  ADMIN: ADMIN_BASE,
  admin: {
    HOME: "home",
    ADD_DISH: `dishes/add`,
    VIEW_DISH: (id?: number) => (id ? `dishes/${id}` : "dishes/:id"),
    EDIT_DISH: (id?: number) => (id ? `dishes/${id}/edit` : 'dishes/:id/edit'),
    LIST_DISHES: "dishes",
  },

  // <-- COMMON ROUTES -->
  common: {
    HOME: "home",
    PROFILE: "profile",
  },
};
