import { RoleEnum } from "@/domain/entities";
import { lazy, useEffect } from "react";
import { BrowserRouter, Navigate, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { ProgressSpinner } from "../components";
import { AuthGuard, RoleGuard } from "../guards";
import { useAuthStore, useTheme, useWindowSize } from "../hooks";
import { useMessage } from "../hooks/useMessage";
import { PrivateRoutes, PublicRoutes } from "../routes";
import {
  routeRole,
  showMessage
} from "../utilities";
import { RouterWithNotFound } from "./RouterWithNotFound";

const HomePage = lazy(() => import("../pages/public/landing/pages/Home.page"));
const LoginPage = lazy(() => import("../pages/public/login/pages/Login.page"));
const RegisterPage = lazy(
  () => import("../pages/public/register/pages/Register.page"),
);

const UserPages = lazy(() => import("./User.router"));
const AdminPages = lazy(() => import("./Admin.router"));

export const AppRouter = () => {
  const { isDark } = useTheme();
  const { isMobile } = useWindowSize();
  const { startRevalidateToken, isLoading, user } = useAuthStore();
  const { messages, type, startClearMessages } = useMessage();

  useEffect(() => {
    startRevalidateToken();
  }, []);

  useEffect(() => {
    if (!messages.length) return;
    showMessage(type, messages);
    startClearMessages();
  }, [messages]);

  if (isLoading) return <ProgressSpinner />;

  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        theme={isDark ? "dark" : "light"}
        richColors
        expand={!isMobile}
        pauseWhenPageIsHidden
        visibleToasts={6}
        duration={5000}
        closeButton
      />
      <RouterWithNotFound>
        <Route
          path="/"
          element={
            <Navigate to={PrivateRoutes[routeRole(user.role)] as string} />
          }
        />
        <Route path={PublicRoutes.HOME} element={<HomePage />} />
        <Route path={PublicRoutes.LOGIN} element={<LoginPage />} />
        <Route path={PublicRoutes.REGISTER} element={<RegisterPage />} />

        {!isLoading && (
          <Route element={<AuthGuard privateValidation />}>
            <Route element={<RoleGuard roles={[RoleEnum.ROLE_USER]} />}>
              <Route path={`${PrivateRoutes.USER}/*`} element={<UserPages />} />
            </Route>
            <Route element={<RoleGuard roles={[RoleEnum.ROLE_ADMIN]} />}>
              <Route
                path={`${PrivateRoutes.ADMIN}/*`}
                element={<AdminPages />}
              />
            </Route>

            {/* <Route
              element={
                <RoleGuard roles={[RoleEnum.ROLE_USER, RoleEnum.ROLE_ADMIN]} />
              }
            >
              <Route
                path={PrivateRoutes.PROFILE}
                element={<h1>Both rols can to acced here</h1>}
              />
            </Route> */}
          </Route>
        )}
      </RouterWithNotFound>
    </BrowserRouter>
  );
};
