export enum RoleEnum {
  ADMIN_ROLE = "ADMIN_ROLE",
  CLIENT_ROLE = "CLIENT_ROLE",
}

export interface RoleEntity {
  id: number;
  name: RoleEnum;
}
