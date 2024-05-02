import { UpdateUser, User } from "@/model";

export interface UserRepository {
  getAll: () => Promise<User[]>;
  update: (user: UpdateUser) => Promise<User>;
}
