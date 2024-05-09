import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../hooks";
import { PrivateRoutes, PublicRoutes } from "../routes";
interface Props {
  privateValidation: boolean;
}

const PrivateValidationFragment = <Outlet />;

const PublicValidationFragment = (
  <Navigate replace to={PrivateRoutes.PRIVATE} />
);

export const AuthGuard = ({ privateValidation }: Props) => {
  const { isAuthenticate } = useAuthStore();
  return isAuthenticate ? (
    privateValidation ? (
      PrivateValidationFragment
    ) : (
      PublicValidationFragment
    )
  ) : (
    <Navigate replace to={PublicRoutes.LOGIN} /> 
  );
};

export default AuthGuard;
