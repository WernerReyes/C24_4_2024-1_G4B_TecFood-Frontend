import { AuthRepository } from "@/domain/interfaces";
import { User } from "@/model";
import { RegisterUserDto } from "../../dtos/auth";

interface registerUserUseCase {
  exceute(registerUserDto: RegisterUserDto): Promise<User>;
}
export const registerUser = (
  repository: AuthRepository,
): registerUserUseCase => {
  return {
    async exceute(registerUserDto: RegisterUserDto): Promise<User> {
      return await repository.registerUser(registerUserDto);
    },
  };
};
