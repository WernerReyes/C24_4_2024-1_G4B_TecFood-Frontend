import { lazy } from "react";
import { Navigate, Route } from "react-router-dom";
import { RouterWithNotFound } from "./RouterWithNotFound";
import { PrivateRoutes } from "../routes";

const HomePage = lazy(() => import("../pages/private/admin/Home/Home.page"));

const AddDishPage = lazy(
  () => import("../pages/private/admin/AddDish/AddDish.page"),
);

const EditDishPage = lazy(
  () => import("../pages/private/admin/EditDish/EditDish.page"),
);

const ListDishesPage = lazy(
  () => import("../pages/private/admin/ListDishes/ListDishes.page"),
);

const CategoryPage = lazy(
  () => import("../pages/private/admin/Category/Category.page"),
);

//* Common pages
const ProfilePage = lazy(
  () => import("../pages/private/common/Profile/Profile.page"),
);

const DetailDishPage = lazy(
  () => import("../pages/private/common/DetailDish/DetailDish.page"),
);

const {
  common: { PROFILE, DETAIL_DISH },
  admin: { HOME, ADD_DISH, LIST_DISHES, EDIT_DISH, CATEGORY },
} = PrivateRoutes;

const AdminRouter = () => {
  return (
    <RouterWithNotFound>
      <Route path="/" element={<Navigate to={HOME} />} />
      <Route path={HOME} element={<HomePage />} />
      <Route path={ADD_DISH} element={<AddDishPage />} />
      <Route path={PROFILE} element={<ProfilePage />} />
      <Route path={EDIT_DISH()} element={<EditDishPage />} />
      <Route path={LIST_DISHES} element={<ListDishesPage />} />
      <Route path={DETAIL_DISH()} element={<DetailDishPage />} />
      <Route path={CATEGORY} element={<CategoryPage />} />
    </RouterWithNotFound>
  );
};

export default AdminRouter;
