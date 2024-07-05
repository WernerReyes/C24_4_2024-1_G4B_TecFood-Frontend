import type { UserEntity } from "@/domain/entities";
import type {
  LoginGoogleResponse,
  LoginResponse,
  RegisterResponse,
  RevalidateTokenResponse,
  UserModel,
} from "@/model";
import { httpRequest } from "@/config/api";
import {
  RegisterUserDto,
  LoginGoogleUserDto,
  LoginUserDto,
} from "@/domain/dtos";
import { userAdapter } from "@/config/adapters";

interface IAuthService {
  loginGoogle(
    loginGoogleUserDto: LoginGoogleUserDto,
  ): Promise<LoginGoogleResponse<UserModel>>;
  login(loginUserDto: LoginUserDto): Promise<LoginResponse<UserModel>>;
  register(registerUserDto: RegisterUserDto): Promise<RegisterResponse>;
  revalidateToken(): Promise<RevalidateTokenResponse<UserModel>>;
}

export class AuthService implements IAuthService {
  private prefix: string;

  constructor() {
    this.prefix = "/auth";
  }

  public async loginGoogle(
    loginGoogleUserDto: LoginGoogleUserDto,
  ): Promise<LoginGoogleResponse<UserModel>> {
    try {
      const { data } = await httpRequest<LoginGoogleResponse<UserEntity>>(
        this.prefix + "/login-google",
        "POST",
        loginGoogleUserDto,
      );

      return { ...data, user: userAdapter(data.user) };
    } catch (error) {
      throw error;
    }
  }

  public async login(
    loginUserDto: LoginUserDto,
  ): Promise<LoginResponse<UserModel>> {
    try {
      const { data } = await httpRequest<LoginResponse<UserEntity>>(
        this.prefix + "/login",
        "POST",
        loginUserDto,
      );
      return { ...data, user: userAdapter(data.user) };
    } catch (error) {
      throw error;
    }
  }

  public async register(
    registerUserDto: RegisterUserDto,
  ): Promise<RegisterResponse> {
    try {
      const { data } = await httpRequest<RegisterResponse>(
        this.prefix + "/register",
        "POST",
        registerUserDto,
      );
      return data;
    } catch (error) {
      throw error;
    }
  }

  public async revalidateToken(): Promise<RevalidateTokenResponse<UserModel>> {
    try {
      const { data } = await httpRequest<RevalidateTokenResponse<UserEntity>>(
        this.prefix + "/revalidate-token",
        "GET",
      );
      return { ...data, user: userAdapter(data.user) };
    } catch (error) {
      throw error;
    }
  }
}
