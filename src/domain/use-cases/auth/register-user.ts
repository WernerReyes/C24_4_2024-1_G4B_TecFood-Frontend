import { AuthRepository } from "@/domain/interfaces";
import { CreateUser } from "@/model";
import { RegisterUserDto } from "../../dtos/auth";

interface registerUserUseCase {
  execute(registerUserDto: RegisterUserDto): Promise<CreateUser>;
}
export const registerUser = (
  repository: AuthRepository,
): registerUserUseCase => {
  return {
    async execute(registerUserDto: RegisterUserDto): Promise<CreateUser> {
      return await repository.registerUser(registerUserDto);
    },
  };
};
