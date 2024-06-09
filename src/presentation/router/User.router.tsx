import { lazy } from "react";
import { Navigate, Route } from "react-router-dom";
import { PrivateRoutes } from "../routes";
import { RouterWithNotFound } from "./RouterWithNotFound";
const HomePage = lazy(() => import("../pages/private/user/pages/Home.page"));

const ProfilePage = lazy(
  () => import("../pages/private/user/pages/Profile.page"),
);

const DishesPage = lazy(
  () => import("../pages/private/user/pages/Dishes.page"),
);

const DetailDishPage = lazy(
  () => import("../pages/private/user/pages/Detail-dish.page"),
);

const CartPage = lazy(() => import("../pages/private/user/pages/Cart.page"));

const { HOME, DISHES, PROFILE, CART } = PrivateRoutes.user;

export const UserRouter = () => {
  return (
    <RouterWithNotFound>
      <Route path="/" element={<Navigate to={HOME} />} />
      <Route path={HOME} element={<HomePage />} />
      <Route path={DISHES} element={<DishesPage />} />
      <Route path={`${DISHES}/:id`} element={<DetailDishPage />} />
      <Route path={CART} element={<CartPage />} />
      <Route path={PROFILE} element={<ProfilePage />} />
    </RouterWithNotFound>
  );
};

export default UserRouter;
