import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../hooks";
import { PrivateRoutes, PublicRoutes } from "../routes";
import { routeRole } from "../utilities";
interface Props {
  privateValidation: boolean;
}

const PrivateValidationFragment = <Outlet />;

export const AuthGuard = ({ privateValidation }: Props) => {
  const { isAuthenticate, user } =  useAuthStore();

  return isAuthenticate ? (
    privateValidation ? (
      PrivateValidationFragment
    ) : (
      <Navigate replace to={PrivateRoutes[routeRole(user.role)] as string} />
    )
  ) : (
    <Navigate replace to={PublicRoutes.LOGIN} />
  );
};

export default AuthGuard;
