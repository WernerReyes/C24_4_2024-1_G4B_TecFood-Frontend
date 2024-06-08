import { RoleEnum } from "@/domain/entities";
import { useAuthStore } from "../hooks";
import { Navigate, Outlet } from "react-router-dom";
import { PublicRoutes } from "../routes";

interface Props {
  roles: RoleEnum[];
}

export const RoleGuard = ({ roles }: Props) => {
  const { authenticatedUser } = useAuthStore();
  return roles.includes(authenticatedUser.role) ? (
    <Outlet />
  ) : (
    <Navigate to={PublicRoutes.HOME} />
  );
};
