import { RoleEntity } from "./role.entity";

export interface UserEntity {
  id: number;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  email: string;
  dni?: string;
  isGoogleAccount: boolean;
  imgUrl?: string;
  password: string;
  role: RoleEntity;
  isVerifiedEmail: boolean;
  createdAt: Date;
  updatedAt: Date;
}

