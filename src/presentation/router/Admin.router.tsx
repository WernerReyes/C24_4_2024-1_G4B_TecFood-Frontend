import { lazy } from "react";
import { Navigate, Route } from "react-router-dom";
import { RouterWithNotFound } from "./RouterWithNotFound";
import { PrivateRoutes } from "../routes";

const HomePage = lazy(() => import("../pages/private/admin/pages/Home.page"));



const AddDishPage = lazy(
  () => import("../pages/private/admin/pages/AddDish.page"),
);

const EditDishPage = lazy(
  () => import("../pages/private/admin/pages/EditDish.page"),
);

const ListDishesPage = lazy(
  () => import("../pages/private/admin/pages/ListDishes.page"),
);

const ViewDishPage = lazy(
  () => import("../pages/private/admin/pages/ViewDish.page"),
);

const { HOME,  ADD_DISH, LIST_DISHES, EDIT_DISH, VIEW_DISH } =
  PrivateRoutes.admin;

const AdminRouter = () => {
  return (
    <RouterWithNotFound>
      <Route path="/" element={<Navigate to={HOME} />} />
      <Route path={HOME} element={<HomePage />} />
      {/* <Route path={PROFILE} element={<ProfilePage />} /> */}
      <Route path={ADD_DISH} element={<AddDishPage />} />
      <Route path={EDIT_DISH()} element={<EditDishPage />} />
      <Route path={VIEW_DISH()} element={<ViewDishPage />} />
      <Route path={LIST_DISHES} element={<ListDishesPage />} />
    </RouterWithNotFound>
  );
};

export default AdminRouter;
