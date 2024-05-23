import type { AuthRepository } from "@/domain/interfaces";
import type { CreateUserModel } from "@/model";
import { RegisterUserDto } from "../../dtos/auth";

interface RegisterUserUseCase {
  execute(registerUserDto: RegisterUserDto): Promise<CreateUserModel>;
}
export class RegisterUser implements RegisterUserUseCase {
  constructor(private readonly repository: AuthRepository) {}

  async execute(registerUserDto: RegisterUserDto): Promise<CreateUserModel> {
    return await this.repository.registerUser(registerUserDto);
  }
}
