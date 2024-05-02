import { UserRepository } from "@/domain/interfaces";
import { User } from "@/model";

interface GetUsersUseCase {
  execute(): Promise<User[]>;
}

export const getUsers = (userRepository: UserRepository): GetUsersUseCase => {
  return {
    async execute(): Promise<User[]> {
      return await userRepository.getAll();
    },
  };
};
