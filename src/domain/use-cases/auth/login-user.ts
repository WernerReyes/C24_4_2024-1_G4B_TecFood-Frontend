import type { AuthRepository } from "@/domain/interfaces";
import type { LoginUserModel } from "@/model";
import { LoginUserDto } from "../../dtos/auth";

interface LoginUserUseCase {
  execute(loginUserDto: LoginUserDto): Promise<LoginUserModel>;
}

export class LoginUser implements LoginUserUseCase {
  constructor(private readonly repository: AuthRepository) {}

  async execute(loginUserDto: LoginUserDto): Promise<LoginUserModel> {
    return await this.repository.loginUser(loginUserDto);
  }
}
