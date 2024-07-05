import type {
  LoginGoogleResponse,
  LoginResponse,
  UserModel,
  RegisterResponse,
  RevalidateTokenResponse,
} from "@/model";
import type {
  LoginGoogleUserDto,
  LoginUserDto,
  RegisterUserDto,
} from "../dtos";
export abstract class AuthRepository {
  abstract loginGoogle(
    loginGoogleUserDto: LoginGoogleUserDto,
  ): Promise<LoginGoogleResponse<UserModel>>;
  abstract login(loginUserDto: LoginUserDto): Promise<LoginResponse<UserModel>>;
  abstract register(
    registerUserDto: RegisterUserDto,
  ): Promise<RegisterResponse>;
  abstract revalidateToken(): Promise<RevalidateTokenResponse<UserModel>>;
}
