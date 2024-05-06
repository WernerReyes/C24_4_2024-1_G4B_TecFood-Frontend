import { CreateUser, LoginUser } from "@/model";
import { LoginGoogleUserDto, RegisterUserDto } from "../dtos";
export interface AuthRepository {
  loginGoogleUser: (
    loginGoogleUserDto: LoginGoogleUserDto,
  ) => Promise<LoginUser>;
  registerUser: (registerUserDto: RegisterUserDto) => Promise<CreateUser>;
}
