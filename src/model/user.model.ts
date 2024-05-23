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

export interface UpdateUserModel
  extends Omit<UserModel, "createdAt" | "updatedAt" | "email"> {}

export interface UserState extends Omit<UserModel, "createdAt" | "updatedAt"> {}

export const userEmptyState: UserState = {
  id: 0,
  name: "",
  lastname: "",
  phone: "",
  email: "",
  dni: "",
  img: "",
  role: "" as RoleEnum,
};
