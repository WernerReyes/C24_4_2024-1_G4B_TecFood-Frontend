import { RoleEnum } from "@/domain/entities";

export interface UserModel {
  id: number;
  name: string;
  lastname: string;
  phone?: string;
  email: string;
  dni?: string;
  img?: string;
  role: RoleEnum;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUserModel {
  message: string;
}

export interface LoginUserModel {
  user: UserModel;
  token: string;
  message: string;
}

export interface UpdateUserModel {
  message: string;
}
export interface UploadProfileModel {
  message: string;
  profileUrl: string;
}


export interface UserState extends UserModel {}

export const userEmptyState: UserState = {
  id: 0,
  name: "",
  lastname: "",
  phone: "",
  email: "",
  dni: "",
  img: "",
  role: "" as RoleEnum,
  createdAt: "" as any as Date,
  updatedAt: "" as any as Date,
};
