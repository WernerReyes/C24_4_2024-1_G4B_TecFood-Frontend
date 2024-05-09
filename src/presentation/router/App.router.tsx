import { lazy, useEffect } from "react";
import { BrowserRouter, Navigate, Route } from "react-router-dom";
import { AuthGuard } from "../guards";
import { useAuthStore } from "../hooks";
import { PrivateRoutes, PublicRoutes } from "../routes";
import { RouterWithNotFound } from "./RouterWithNotFound";
import { ProgressSpinner } from "../components";

const HomePage = lazy(() => import("../pages/public/landing/pages/Home.page"));
const LoginPage = lazy(() => import("../pages/public/login/pages/Login.page"));
const RegisterPage = lazy(
  () => import("../pages/public/register/pages/Register.page"),
);

const PrivatePages = lazy(() => import("./Private.router"));

export const AppRouter = () => {
  const { startRevalidateToken, isLoading } = useAuthStore();

  useEffect(() => {
    startRevalidateToken();
  }, []);

  if (isLoading) return <ProgressSpinner />;

  return (
    <BrowserRouter>
      <RouterWithNotFound>
        <Route path="/" element={<Navigate to={PrivateRoutes.PRIVATE} />} />
        <Route path={PublicRoutes.HOME} element={<HomePage />} />
        <Route path={PublicRoutes.LOGIN} element={<LoginPage />} />
        <Route path={PublicRoutes.REGISTER} element={<RegisterPage />} />

        {!isLoading && (
          <Route element={<AuthGuard privateValidation />}>
            <Route
              path={`${PrivateRoutes.PRIVATE}/*`}
              element={<PrivatePages />}
            />
          </Route>
        )}

        {/* <Route element={<RoleGuard rol={Roles.ADMIN} />}>
          <Route path={PrivateRoutes.DASHBOARD} element={<Dashboard />} />
        </Route> */}
      </RouterWithNotFound>
    </BrowserRouter>
  );
};
