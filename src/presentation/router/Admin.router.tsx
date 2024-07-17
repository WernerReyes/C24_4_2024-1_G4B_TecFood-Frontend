import { lazy } from "react";
import { Navigate, Route } from "react-router-dom";
import { RouterWithNotFound } from "./RouterWithNotFound";
import { PrivateRoutes } from "../routes";

const HomePage = lazy(() => import("../pages/private/admin/pages/Home.page"));

const ProfilePage = lazy(
  () => import("../pages/private/admin/pages/Profile.page"),
);

const AddDishPage = lazy(
  () => import("../pages/private/admin/pages/AddDish.page"),
);

const { HOME, PROFILE, ADD_DISH, DISHES_LIST } = PrivateRoutes.admin;

export const AdminRouter = () => {
  return (
    <RouterWithNotFound>
      <Route path="/" element={<Navigate to={HOME} />} />
      <Route path={HOME} element={<HomePage />} />
      <Route path={PROFILE} element={<ProfilePage />} />
      <Route path={ADD_DISH} element={<AddDishPage />} />
      <Route path={DISHES_LIST} element={<h1>Dishes List</h1>} />
    </RouterWithNotFound>
  );
};

export default AdminRouter;
