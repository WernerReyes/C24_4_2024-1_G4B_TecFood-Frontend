import type { AuthRepository } from "@/domain/interfaces";
import type { LoginUserModel } from "@/model";
import { LoginGoogleUserDto } from "../../dtos/auth";

interface LoginGoogleUserUseCase {
  execute(loginGoogleUserDto: LoginGoogleUserDto): Promise<LoginUserModel>;
}

export class LoginGoogleUser implements LoginGoogleUserUseCase {
  constructor(private readonly repository: AuthRepository) {}

  async execute(
    loginGoogleUserDto: LoginGoogleUserDto,
  ): Promise<LoginUserModel> {
    return await this.repository.loginGoogleUser(loginGoogleUserDto);
  }
}
