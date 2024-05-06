export enum RoleEnum {
  ROLE_ADMIN = "ROLE_ADMIN",
  ROLE_USER = "ROLE_USER",
}

export interface RoleEntity {
  id: number;
  name: RoleEnum;
}
