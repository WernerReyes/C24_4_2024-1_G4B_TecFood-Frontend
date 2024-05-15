import type { AuthRepository } from "@/domain/interfaces";
import type { LoginUser } from "@/model";
import { LoginUserDto } from '../../dtos/auth';

interface loginUserUseCase {
  execute(loginUserDto: LoginUserDto): Promise<LoginUser>;
}
export const loginUser = (
  repository: AuthRepository,
): loginUserUseCase => {
  return {
    async execute(loginUserDto: LoginUserDto): Promise<LoginUser> {
      return await repository.loginUser(loginUserDto);
    },
  };
};
