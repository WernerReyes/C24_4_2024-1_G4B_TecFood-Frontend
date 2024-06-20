import type { CreateUserModel, LoginUserModel } from "@/model";
import { LoginGoogleUserDto, LoginUserDto, RegisterUserDto } from "../dtos";
export interface AuthRepository {
  loginGoogleUser: (
    loginGoogleUserDto: LoginGoogleUserDto,
  ) => Promise<LoginUserModel>;
  loginUser: (loginUserDto: LoginUserDto) => Promise<LoginUserModel>;
  registerUser: (registerUserDto: RegisterUserDto) => Promise<CreateUserModel>;
  revalidateToken: () => Promise<LoginUserModel>;
}
