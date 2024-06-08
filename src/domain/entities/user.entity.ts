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

export interface UpdateUserResponse {
  message: string;
}

export interface UploadProfileResponse {
  message: string;
  profileUrl: string;
}
