import { RoleEnum } from "@/domain/entities";
import { currentRole } from "../utilities";

const USER_BASE = "/user";
const ADMIN_BASE = "/admin";

export type IPrivateRoutes = {
  USER: string;
  user: {
    CART: string;
    ORDER_HISTORY: string;
    PAYMENT: (orderDishId?: number) => string;
  };
  ADMIN: string;
  admin: {
    ADD_DISH: string;
    EDIT_DISH: (id?: number) => string;
    OFFER_DISH: string;
    CATEGORY: string;
  };

  common: {
    HOME: (role?: RoleEnum) => string;
    PROFILE: (role?: RoleEnum) => string;
    LIST_DISHES: (role?: RoleEnum) => string;
    DETAIL_DISH: (role?: RoleEnum, id?: number) => string;
  };
};

export const PrivateRoutes: IPrivateRoutes = {
  // <-- USER ROUTES -->
  USER: USER_BASE,
  user: {
    CART: `${USER_BASE}/cart`,
    ORDER_HISTORY: `${USER_BASE}/order-history`,
    PAYMENT: (orderDishId?: number) =>
      orderDishId
        ? `${USER_BASE}payment/${orderDishId}`
        : "payment/:orderDishId",
  },

  // <-- ADMIN ROUTES -->
  ADMIN: ADMIN_BASE,
  admin: {
    ADD_DISH: `${ADMIN_BASE}/add-dish`,
    EDIT_DISH: (id?: number) =>
      id ? `${ADMIN_BASE}/dishes/${id}/edit` : "dishes/:id/edit",
    OFFER_DISH: `${ADMIN_BASE}/offer-dish`,
    CATEGORY: `${ADMIN_BASE}/category`,
  },

  // <-- COMMON ROUTES -->
  common: {
    HOME: (role?: RoleEnum) => (role ? `${currentRole(role)}/home` : "home"),
    PROFILE: (role?: RoleEnum) =>
      role ? `${currentRole(role)}/profile` : "profile",
    LIST_DISHES: (role?: RoleEnum) =>
      role ? `${currentRole(role)}/dishes` : "dishes",
    DETAIL_DISH: (role?: RoleEnum, id?: number) =>
      id && role ? `${currentRole(role)}/dishes/${id}` : "dishes/:id",
  },
};
