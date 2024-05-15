import { lazy } from "react";
import { Navigate, Route } from "react-router-dom";
import { PrivateRoutes } from "../routes";
import { RouterWithNotFound } from "./RouterWithNotFound";

const UserHomePage = lazy(
  () => import("../pages/private/user/pages/Home.page"),
);

const { HOME, PROFILE } = PrivateRoutes.user;

export const UserRouter = () => {
  return (
    <RouterWithNotFound>
      <Route path="/" element={<Navigate to={HOME} />} />
      <Route path={PROFILE} element={<div>Estamos en profile</div>} />
      <Route path={HOME} element={<UserHomePage />} />
    </RouterWithNotFound>
  );
};

export default UserRouter;
