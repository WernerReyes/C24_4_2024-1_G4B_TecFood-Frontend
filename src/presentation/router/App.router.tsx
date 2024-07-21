import React, { lazy, useEffect } from "react";
import { BrowserRouter, Navigate, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { RoleEnum } from "@/domain/entities";
import { ProgressSpinner } from "../components";
import { AuthGuard, RoleGuard } from "../guards";
import {
  useAuthStore,
  useThemeStore,
  useWindowSize,
  useMessageStore,
} from "../hooks";
import { PrivateRoutes, PublicRoutes } from "../routes";
import { routeRole, showMessage } from "../utilities";
import { RouterWithNotFound } from "./RouterWithNotFound";
import { AdminLayout } from "../pages/private/admin/layout";
import { UserLayout } from "../pages/private/user/layout";

//* Public pages
const HomePage = lazy(() => import("../pages/public/landing/pages/Home.page"));
const LoginPage = lazy(() => import("../pages/public/login/pages/Login.page"));
const RegisterPage = lazy(
  () => import("../pages/public/register/pages/Register.page"),
);

//* Private pages
const UserPages = lazy(() => import("./User.router"));
const AdminPages = lazy(() => import("./Admin.router"));

//* Common Private pages
const ProfilePage = lazy(
  () => import("../pages/private/common/pages/Profile.page"),
);

const { HOME, LOGIN, REGISTER } = PublicRoutes;

const {
  common: { PROFILE },
  USER,
  ADMIN,
} = PrivateRoutes;

export const AppRouter = () => {
  const { isDark } = useThemeStore();
  const { isMobile } = useWindowSize();
  const { startRevalidateToken, isLoading, authenticatedUser } = useAuthStore();
  const { messages, type, startClearMessages } = useMessageStore();

  const roleRoute = PrivateRoutes[routeRole(authenticatedUser.role)].toString();

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
        <Route path="/" element={<Navigate to={roleRoute} />} />
        <Route path={HOME} element={<HomePage />} />
        <Route path={LOGIN} element={<LoginPage />} />
        <Route path={REGISTER} element={<RegisterPage />} />

        {!isLoading && (
          <Route element={<AuthGuard privateValidation />}>
            //* Routes for common (user and admin)
            <Route
              element={
                <RoleGuard roles={[RoleEnum.ROLE_USER, RoleEnum.ROLE_ADMIN]} />
              }
            >
              <Route
                path={`${roleRoute}/${PROFILE}`}
                element={
                  <Layout role={authenticatedUser.role}>
                    <ProfilePage />
                  </Layout>
                }
              />
            </Route>
            //* Routes for user
            <Route element={<RoleGuard roles={[RoleEnum.ROLE_USER]} />}>
              <Route path={`${USER}/*`} element={<UserPages />} />
            </Route>
            //* Routes for admin
            <Route element={<RoleGuard roles={[RoleEnum.ROLE_ADMIN]} />}>
              <Route path={`${ADMIN}/*`} element={<AdminPages />} />
            </Route>
          </Route>
        )}
      </RouterWithNotFound>
    </BrowserRouter>
  );
};

const Layout = ({
  role,
  children,
}: {
  role: RoleEnum;
  children: React.ReactNode;
}) => {
  switch (role) {
    case RoleEnum.ROLE_ADMIN:
      return <AdminLayout children={children} />;
    case RoleEnum.ROLE_USER:
      return <UserLayout children={children} />;
  }
};
