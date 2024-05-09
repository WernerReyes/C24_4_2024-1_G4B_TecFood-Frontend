import { lazy } from "react";
import { Navigate, Route } from "react-router-dom";
import { RouterWithNotFound } from "./RouterWithNotFound";
import { PrivateRoutes } from "../routes";

const UserHomePage = lazy(
  () => import("../pages/private/client/pages/Home.page"),
);

export const PrivateRouter = () => {
  return (
    <RouterWithNotFound>
       <Route path="/" element={<Navigate to={PrivateRoutes.DASHBOARD}/>} />
      <Route path={PrivateRoutes.PROFILE} element={<div>Estamos en profile</div>} />
      <Route path={PrivateRoutes.DASHBOARD} element={<UserHomePage />} />
    </RouterWithNotFound>
  );
};

export default PrivateRouter
