export interface User {
  id: number;
  name: string;
  lastname: string;
  phone: string;
  email: string;
  dni: string;
  img?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UpdateUser
  extends Omit<User, "createdAt" | "updatedAt" | "email"> {}

export interface UserState extends Omit<User, "createdAt" | "updatedAt"> {}

export const userEmptyState: UserState = {
  id: 0,
  name: "",
  lastname: "",
  phone: "",
  email: "",
  dni: "",
};
