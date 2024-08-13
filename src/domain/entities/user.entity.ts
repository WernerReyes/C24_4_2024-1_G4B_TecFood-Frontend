import { RoleEntity } from "./role.entity";

export interface UserEntity {
  id: number;
  firstName: string;
  lastName: string;
  phoneNumber: string | null;
  email: string;
  dni: string | null;
  isGoogleAccount: boolean;
  imgUrl: string | null;
  password: string;
  role: RoleEntity;
  isVerifiedEmail: boolean;
  createdAt: Date;
  updatedAt: Date;
}

