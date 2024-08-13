import { RoleEnum } from "@/domain/entities";
import { PrivateRoutes } from "../routes";

export const routeRole = (role: RoleEnum) => {
  const defaultRole = role || RoleEnum.ROLE_USER;
  return defaultRole.replace("ROLE_", "") as keyof typeof PrivateRoutes;
};

export const currentRole = (role: RoleEnum) => {
  return "/" + role.replace("ROLE_", "").toLowerCase();
};

export const removeBaseRoute = <T extends { [key: string]: string }>(
  routes: T,
  baseUrl: string,
): T => {
  const keys = Object.keys(routes);
  keys.forEach((key) => {
    routes[key as keyof T] = routes[key].replace(baseUrl, "") as T[keyof T];
  });
  return routes;
};
