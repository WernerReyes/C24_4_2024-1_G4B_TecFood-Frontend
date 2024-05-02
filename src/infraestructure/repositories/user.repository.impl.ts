import { UserRepository } from "@/domain/interfaces";
import { getAllUsers, updateUser } from "../services";
import { UpdateUser } from "@/model";

export const userRepositoryImpl: UserRepository = {
  getAll: async () => getAllUsers(),
  update: async (user: UpdateUser) => updateUser(user),
};
