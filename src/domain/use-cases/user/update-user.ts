import { UserRepository } from "@/domain/interfaces";
import { UpdateUser, User } from "@/model";

interface UpdateUserUseCase {
  execute(user: UpdateUser): Promise<User>;
}

export const updateUser = (
  userRepository: UserRepository,
): UpdateUserUseCase => {
  return {
    async execute(user: UpdateUser): Promise<User> {
      return await userRepository.update(user);
    },
  };
};
