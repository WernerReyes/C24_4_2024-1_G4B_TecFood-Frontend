import type { UserEntity } from "@/domain/entities";
import type { UserModel } from "@/model";
import { httpRequest } from "@/config/api";
import {
  RegisterRequest,
  LoginGoogleRequest,
  LoginRequest,
  type ApiResponse,
  type LoginResponse,
} from "@/domain/dtos";
import { userAdapter } from "@/config/adapters";

interface IAuthService {
  loginGoogle(
    loginGoogleRequest: LoginGoogleRequest,
  ): Promise<ApiResponse<LoginResponse<UserModel>>>;
  login(
    loginRequest: LoginRequest,
  ): Promise<ApiResponse<LoginResponse<UserModel>>>;
  register(registerRequest: RegisterRequest): Promise<ApiResponse<void>>;
  revalidateToken(): Promise<ApiResponse<UserModel>>;
}

export class AuthService implements IAuthService {
  private prefix: string;

  constructor() {
    this.prefix = "/auth";
  }

  public async loginGoogle(loginGoogleRequest: LoginGoogleRequest) {
    try {
      const { data, ...rest } = await httpRequest.post<
        LoginResponse<UserEntity>
      >(
        this.prefix + "/login-google",

        loginGoogleRequest,
      );

      return {
        ...rest,
        data: {
          ...data,
          user: userAdapter(data.user),
        },
      };
    } catch (error) {
      throw error;
    }
  }

  public async login(loginRequest: LoginRequest) {
    try {
      const { data, ...rest } = await httpRequest.post<
        LoginResponse<UserEntity>
      >(
        this.prefix + "/login",

        loginRequest,
      );
      return { ...rest, data: { ...data, user: userAdapter(data.user) } };
    } catch (error) {
      throw error;
    }
  }

  public async register(registerRequest: RegisterRequest) {
    try {
      return await httpRequest.post<void>(
        this.prefix + "/register",
        registerRequest,
      );
    } catch (error) {
      throw error;
    }
  }

  public async revalidateToken() {
    try {
      const { data, ...rest } = await httpRequest.get<UserEntity>(
        this.prefix + "/revalidate-token",
      );
      return { ...rest, data: userAdapter(data) };
    } catch (error) {
      throw error;
    }
  }
}
