import { lazy, useEffect } from "react";
import { BrowserRouter, Navigate, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { RoleEnum } from "@/domain/entities";
import { ProgressSpinner } from "../core/components";
import { AuthGuard, RoleGuard } from "../guards";
import {
  useAuthStore,
  useThemeStore,
  useWindowSize,
  useMessageStore,
} from "../hooks";
import { PrivateRoutes, PublicRoutes } from "../routes";
import { showMessage } from "../utilities";
import { RouterWithNotFound } from "./RouterWithNotFound";

//* Public pages
const LandingPage = lazy(() => import("../pages/public/Landing/Landing.page"));
const LoginPage = lazy(() => import("../pages/public/Login/Login.page"));
const RegisterPage = lazy(
  () => import("../pages/public/Register/Register.page"),
);

//* Private pages
const UserRouter = lazy(() => import("./User.router"));
const AdminRouter = lazy(() => import("./Admin.router"));

const { LANDING, LOGIN, REGISTER } = PublicRoutes;

const { USER, ADMIN } = PrivateRoutes;

export const AppRouter = () => {
  const { isDark } = useThemeStore();
  const { isMobile } = useWindowSize();
  const { startRevalidateToken, isLoading, routeRole } = useAuthStore();
  const { messages, type, startClearMessages } = useMessageStore();

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
        <Route path="/" element={<Navigate to={routeRole} />} />
        <Route path={LANDING} element={<LandingPage />} />
        <Route path={LOGIN} element={<LoginPage />} />
        <Route path={REGISTER} element={<RegisterPage />} />

        {!isLoading && (
          <Route element={<AuthGuard privateValidation />}>
            //* Routes for user
            <Route element={<RoleGuard roles={[RoleEnum.ROLE_USER]} />}>
              <Route path={`${USER}/*`} element={<UserRouter />} />
            </Route>
            //* Routes for admin
            <Route element={<RoleGuard roles={[RoleEnum.ROLE_ADMIN]} />}>
              <Route path={`${ADMIN}/*`} element={<AdminRouter />} />
            </Route>
          </Route>
        )}
      </RouterWithNotFound>
    </BrowserRouter>
  );
};
