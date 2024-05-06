import { Navigate, Outlet } from "react-router-dom";
import { PrivateRoutes, PublicRoutes } from "../routes";
import { useAuthStore } from "../hooks";

interface Props {
  privateValidation: boolean;
}

const PrivateValidationFragment = <Outlet />;

const PublicValidationFragment = (
  <Navigate replace to={PrivateRoutes.PRIVATE} />
);

export const AuthGuard = ({ privateValidation }: Props) => {
  const { user } = useAuthStore();
  console.log(user.name);
  return user.name ? (
    privateValidation ? (
      PrivateValidationFragment
    ) : (
      PublicValidationFragment
    )
  ) : (
    <Navigate replace to={PublicRoutes.HOME} />
  );
};

export default AuthGuard;
