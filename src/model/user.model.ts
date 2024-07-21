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

export const userEmptyState: UserModel = {
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
