const USER_BASE = "/user";
const ADMIN_BASE = "/admin";

export type IPrivateRoutes = {
  USER: string;
  user: {
    HOME: string;
    DETAIL_DISH: string;
    PROFILE: string;
  };
  ADMIN: string;
  admin: {
    HOME: string;
    PROFILE: string;
  };
  PROFILE: string;
};

export const PrivateRoutes: IPrivateRoutes = {
  // <-- USER ROUTES -->
  USER: USER_BASE,
  user: {
    HOME: "home",
    DETAIL_DISH: "detail",
    PROFILE: "profile",
  },

  // <-- ADMIN ROUTES -->
  ADMIN: ADMIN_BASE,
  admin: {
    HOME: "home",
    PROFILE: "profile",
  },

  // <-- COMMON ROUTES -->
  PROFILE: "profile",
};
