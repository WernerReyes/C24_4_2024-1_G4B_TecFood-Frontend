import { lazy } from "react";
import { Navigate, Route } from "react-router-dom";
import { PrivateRoutes } from "../routes";
import { RouterWithNotFound } from "./RouterWithNotFound";

const HomePage = lazy(() => import("../pages/private/user/pages/Home.page"));

const ProfilePage = lazy(
  () => import("../pages/private/user/pages/Profile.page"),
);

const { HOME, PROFILE } = PrivateRoutes.user;

export const UserRouter = () => {
  return (
    <RouterWithNotFound>
      <Route path="/" element={<Navigate to={HOME} />} />
      <Route path={HOME} element={<HomePage />} />
      <Route path={PROFILE} element={<ProfilePage />} />
    </RouterWithNotFound>
  );
};

export default UserRouter;
