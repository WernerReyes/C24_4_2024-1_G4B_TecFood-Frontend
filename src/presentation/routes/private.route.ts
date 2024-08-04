const USER_BASE = "/user";
const ADMIN_BASE = "/admin";

export type IPrivateRoutes = {
  USER: string;
  user: {
    HOME: string;
    DISHES: string;
    CART: string;
    ORDER_HISTORY: string;
    PAYMENT: (orderDishId?: number) => string;
  };
  ADMIN: string;
  admin: {
    HOME: string;
    ADD_DISH: string;
    EDIT_DISH: (id?: number) => string;
    LIST_DISHES: string;
    OFFER_DISH: string;
    CATEGORY: string;
  };

  common: {
    PROFILE: string;
    DETAIL_DISH: (id?: number) => string;
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
    PAYMENT: (orderDishId?: number) =>
      orderDishId ? `payment/${orderDishId}` : "payment/:orderDishId",
  },

  // <-- ADMIN ROUTES -->
  ADMIN: ADMIN_BASE,
  admin: {
    HOME: "home",
    ADD_DISH: "dishes/add",
    EDIT_DISH: (id?: number) => (id ? `dishes/${id}/edit` : "dishes/:id/edit"),
    OFFER_DISH: "offer-dish",
    LIST_DISHES: "dishes",
    CATEGORY: "categories",
  },

  // <-- COMMON ROUTES -->
  common: {
    PROFILE: "profile",
    DETAIL_DISH: (id?: number) => (id ? `dishes/${id}` : "dishes/:id"),
  },
};
