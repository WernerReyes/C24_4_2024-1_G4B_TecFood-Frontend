import { lazy } from "react";
import { RouterWithNotFound } from "./RouterWithNotFound";
import { Route, BrowserRouter, Navigate, Link } from "react-router-dom";
import { PrivateRoutes, PublicRoutes } from "../routes";
import { AuthGuard } from "../guards";

const HomePage = lazy(() => import("../pages/public/landing/pages/Home.page"));
const LoginPage = lazy(() => import("../pages/public/login/pages/Login.page"));
const ClientHomePage = lazy(
  () => import("../pages/private/client/pages/Home.page"),
);
const RegisterPage = lazy(
  () => import("../pages/public/register/pages/Register.page"),
);

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <RouterWithNotFound>
        <Route path="/" element={<Navigate to={PrivateRoutes.PRIVATE} />} />
        <Route path={PublicRoutes.HOME} element={<HomePage />} />
        <Route path={PublicRoutes.LOGIN} element={<LoginPage />} />
        <Route path={PublicRoutes.REGISTER} element={<RegisterPage />} />
        <Route element={<AuthGuard privateValidation />}>
          <Route
            path={`${PrivateRoutes.PRIVATE}/*`}
            element={
              <>
                <Link to={PrivateRoutes.PROFILE}>Profile</Link>
              </>
            }
          />
          <Route
            path={PrivateRoutes.PROFILE}
            element={<div>Estamos en profile</div>}
          />
        </Route>

        {/* <Route element={<RoleGuard rol={Roles.ADMIN} />}>
          <Route path={PrivateRoutes.DASHBOARD} element={<Dashboard />} />
        </Route> */}
      </RouterWithNotFound>
    </BrowserRouter>
  );
};
