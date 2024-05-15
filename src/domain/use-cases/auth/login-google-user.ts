import type { AuthRepository } from "@/domain/interfaces";
import type { LoginUser } from "@/model";
import { LoginGoogleUserDto } from '../../dtos/auth';

interface loginGoogleUserUseCase {
  execute(loginGoogleUserDto: LoginGoogleUserDto): Promise<LoginUser>;
}
export const loginGoogleUser = (
  repository: AuthRepository,
): loginGoogleUserUseCase => {
  return {
    async execute(loginGoogleUserDto: LoginGoogleUserDto): Promise<LoginUser> {
      return await repository.loginGoogleUser(loginGoogleUserDto);
    },
  };
};
