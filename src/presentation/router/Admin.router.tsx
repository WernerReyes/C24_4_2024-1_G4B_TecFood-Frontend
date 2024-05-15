import { lazy } from "react";
import { Navigate, Route } from "react-router-dom";
import { RouterWithNotFound } from "./RouterWithNotFound";
import { PrivateRoutes } from "../routes";

const HomePage = lazy(
  () => import("../pages/private/admin/pages/Home.page"),
);

const { HOME } = PrivateRoutes.admin;

export const AdminRouter = () => {
  return (
    <RouterWithNotFound>
       <Route path="/" element={<Navigate to={HOME}/>} />
      {/* <Route path={PrivateRoutes.PROFILE} element={<div>Estamos en profile</div>} /> */}
      <Route path={HOME} element={<HomePage />} />
    </RouterWithNotFound>
  );
};

export default AdminRouter
