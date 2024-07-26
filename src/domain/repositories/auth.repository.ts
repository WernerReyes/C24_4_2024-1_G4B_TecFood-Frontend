import type { UserModel } from "@/model";
import type {
  LoginGoogleRequest,
  LoginRequest,
  RegisterRequest,
  ApiResponse,
  LoginResponse,
} from "../dtos";
export abstract class AuthRepository {
  abstract loginGoogle(
    loginGoogleRequest: LoginGoogleRequest,
  ): Promise<ApiResponse<LoginResponse<UserModel>>>;
  abstract login(
    loginRequest: LoginRequest,
  ): Promise<ApiResponse<LoginResponse<UserModel>>>;
  abstract register(registerRequest: RegisterRequest): Promise<ApiResponse<void>>;
  abstract revalidateToken(): Promise<ApiResponse<UserModel>>;
}
