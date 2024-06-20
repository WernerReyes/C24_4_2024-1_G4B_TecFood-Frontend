import type { UserEntity } from "@/domain/entities";
import type { CreateUserModel, LoginUserModel } from "@/model";
import { httpRequest } from "@/config/api";
import {
  RegisterUserDto,
  LoginGoogleUserDto,
  LoginUserDto,
} from "@/domain/dtos";
import { userAdapter } from "@/config/adapters";

export type LoginUserResponse = {
  user: UserEntity;
  token: string;
  message: string;
};

type RegisterUserResponse = {
  message: string;
};

interface IAuthService {
  loginGoogle(loginGoogleUserDto: LoginGoogleUserDto): Promise<LoginUserModel>;
  login(loginUserDto: LoginUserDto): Promise<LoginUserModel>;
  register(registerUserDto: RegisterUserDto): Promise<CreateUserModel>;
  revalidateToken(): Promise<LoginUserModel>;
}

export class AuthService implements IAuthService {
  private prefix: string;

  constructor() {
    this.prefix = "/auth";
  }

  public async loginGoogle(
    loginGoogleUserDto: LoginGoogleUserDto,
  ): Promise<LoginUserModel> {
    try {
      const { data } = await httpRequest<LoginUserResponse>(
        this.prefix + "/login-google",
        "POST",
        loginGoogleUserDto,
      );
      return { ...data, user: userAdapter(data.user) };
    } catch (error) {
      throw error;
    }
  }

  public async login(loginUserDto: LoginUserDto): Promise<LoginUserModel> {
    try {
      const { data } = await httpRequest<LoginUserResponse>(
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
  ): Promise<CreateUserModel> {
    try {
      const { data } = await httpRequest<RegisterUserResponse>(
        this.prefix + "/register",
        "POST",
        registerUserDto,
      );
      return data;
    } catch (error) {
      throw error;
    }
  }

  public async revalidateToken(): Promise<LoginUserModel> {
    try {
      const { data } = await httpRequest<LoginUserResponse>(
        this.prefix + "/revalidate-token",
        "GET",
      );
      return { ...data, user: userAdapter(data.user) };
    } catch (error) {
      throw error;
    }
  }
}
