import type { UserEntity } from "@/domain/entities";
import type { UserModel } from "@/model";
import { httpRequest } from "@/config/api";
import {
  RegisterDto,
  LoginGoogleDto,
  LoginDto,
  type ApiResponse,
  type LoginResponse,
} from "@/domain/dtos";
import { userAdapter } from "@/config/adapters";

interface IAuthService {
  loginGoogle(
    loginGoogleDto: LoginGoogleDto,
  ): Promise<ApiResponse<LoginResponse<UserModel>>>;
  login(loginDto: LoginDto): Promise<ApiResponse<LoginResponse<UserModel>>>;
  register(registerDto: RegisterDto): Promise<ApiResponse<void>>;
  revalidateToken(): Promise<ApiResponse<UserModel>>;
}

export class AuthService implements IAuthService {
  private prefix: string;

  constructor() {
    this.prefix = "/auth";
  }

  public async loginGoogle(loginGoogleDto: LoginGoogleDto) {
    try {
      const { data, ...rest } = await httpRequest<LoginResponse<UserEntity>>(
        this.prefix + "/login-google",
        "POST",
        loginGoogleDto,
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

  public async login(loginDto: LoginDto) {
    try {
      const { data, ...rest } = await httpRequest<LoginResponse<UserEntity>>(
        this.prefix + "/login",
        "POST",
        loginDto,
      );
      return { ...rest, data: { ...data, user: userAdapter(data.user) } };
    } catch (error) {
      throw error;
    }
  }

  public async register(registerDto: RegisterDto) {
    try {
      return await httpRequest<void>(
        this.prefix + "/register",
        "POST",
        registerDto,
      );
    } catch (error) {
      throw error;
    }
  }

  public async revalidateToken() {
    try {
      const { data, ...rest } = await httpRequest<UserEntity>(
        this.prefix + "/revalidate-token",
        "GET",
      );
      return { ...rest, data: userAdapter(data) };
    } catch (error) {
      throw error;
    }
  }
}
