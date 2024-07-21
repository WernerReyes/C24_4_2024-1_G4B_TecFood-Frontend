import type {
  LoginGoogleResponse,
  LoginResponse,
  UserModel,
  RegisterResponse,
  RevalidateTokenResponse,
} from "@/model";
import type {
  LoginGoogleDto,
  LoginDto,
  RegisterDto,
} from "../dtos";
export abstract class AuthRepository {
  abstract loginGoogle(
    loginGoogleDto: LoginGoogleDto,
  ): Promise<LoginGoogleResponse<UserModel>>;
  abstract login(loginDto: LoginDto): Promise<LoginResponse<UserModel>>;
  abstract register(
    registerDto: RegisterDto,
  ): Promise<RegisterResponse>;
  abstract revalidateToken(): Promise<RevalidateTokenResponse<UserModel>>;
}
