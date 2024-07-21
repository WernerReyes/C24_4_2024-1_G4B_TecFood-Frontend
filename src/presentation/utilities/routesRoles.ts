import { RoleEnum } from "@/domain/entities";
import { PrivateRoutes } from "../routes";

export const routeRole = (role: RoleEnum) => {
  console.log(role);
  const defaultRole = role || RoleEnum.ROLE_USER;
  return defaultRole.replace("ROLE_","") as keyof typeof PrivateRoutes;
};
