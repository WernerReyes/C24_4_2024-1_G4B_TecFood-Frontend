import { lazy } from "react";
import { Navigate, Route } from "react-router-dom";
import { PrivateRoutes } from "../routes";
import { RouterWithNotFound } from "./RouterWithNotFound";
import { removeBaseRoute } from "../utilities";

const HomePage = lazy(() => import("../pages/private/user/Home/Home.page"));

const DishesPage = lazy(
  () => import("../pages/private/user/Dishes/Dishes.page"),
);

const CartPage = lazy(() => import("../pages/private/user/Cart/Cart.page"));

const OrderHistoryPage = lazy(
  () => import("../pages/private/user/OrderHistory/OrderHistory.page"),
);

const PaymentPage = lazy(
  () => import("../pages/private/user/Payment/Payment.page"),
);

//* Common pages
const ProfilePage = lazy(
  () => import("../pages/private/common/Profile/Profile.page"),
);

const DetailDishPage = lazy(
  () => import("../pages/private/common/DetailDish/DetailDish.page"),
);

const {
  USER,
  common: { HOME, LIST_DISHES, PROFILE, DETAIL_DISH },
  user: { PAYMENT, ...rest },
} = PrivateRoutes;
const { CART, ORDER_HISTORY } = removeBaseRoute(rest, USER + "/");

export const UserRouter = () => (
  <RouterWithNotFound>
    <Route path="/" element={<Navigate to={HOME()} />} />
    <Route path={HOME()} element={<HomePage />} />
    <Route path={LIST_DISHES()} element={<DishesPage />} />
    <Route path={DETAIL_DISH()} element={<DetailDishPage />} />
    <Route path={CART} element={<CartPage />} />
    <Route path={ORDER_HISTORY} element={<OrderHistoryPage />} />
    <Route path={PROFILE()} element={<ProfilePage />} />
    <Route path={PAYMENT()} element={<PaymentPage />} />
  </RouterWithNotFound>
);

export default UserRouter;
