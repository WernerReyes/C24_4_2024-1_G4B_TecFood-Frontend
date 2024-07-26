import type { UserModel } from "@/model";
import type {
  LoginGoogleDto,
  LoginDto,
  RegisterDto,
  ApiResponse,
  LoginResponse,
} from "../dtos";
export abstract class AuthRepository {
  abstract loginGoogle(
    loginGoogleDto: LoginGoogleDto,
  ): Promise<ApiResponse<LoginResponse<UserModel>>>;
  abstract login(
    loginDto: LoginDto,
  ): Promise<ApiResponse<LoginResponse<UserModel>>>;
  abstract register(registerDto: RegisterDto): Promise<ApiResponse<void>>;
  abstract revalidateToken(): Promise<ApiResponse<UserModel>>;
}
