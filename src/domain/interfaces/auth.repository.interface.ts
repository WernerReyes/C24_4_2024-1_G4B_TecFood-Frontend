import { CreateUser, LoginUser } from "@/model";
import { LoginGoogleUserDto, LoginUserDto, RegisterUserDto } from "../dtos";
export interface AuthRepository {
  loginGoogleUser: (
    loginGoogleUserDto: LoginGoogleUserDto,
  ) => Promise<LoginUser>;
  loginUser: (loginUserDto: LoginUserDto) => Promise<LoginUser>;
  registerUser: (registerUserDto: RegisterUserDto) => Promise<CreateUser>;
  revalidateToken: () => Promise<LoginUser>;
}
