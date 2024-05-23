import type { UserEntity } from "@/domain/entities";
import type { CreateUserModel, LoginUserModel } from "@/model";
import { httpRequest } from "@/config/api";
import {
  RegisterUserDto,
  LoginGoogleUserDto,
  LoginUserDto,
} from "@/domain/dtos";
import { userAdapter } from "@/config/adapters";

type LoginUserResponse = {
  user: UserEntity;
  token: string;
  message: string;
};

type RegisterUserResponse = {
  message: string;
};

interface IAuthService {
  loginGoogle(
    loginGoogleUserDto: LoginGoogleUserDto,
  ): Promise<LoginUserModel>;
  login(loginUserDto: LoginUserDto): Promise<LoginUserModel>;
  register(registerUserDto: RegisterUserDto): Promise<CreateUserModel>;
  revalidateToken(): Promise<LoginUserModel>;
}

export class AuthService implements IAuthService {
  private baseUrl = "/auth";

  public async loginGoogle(
    loginGoogleUserDto: LoginGoogleUserDto,
  ): Promise<LoginUserModel> {
    try {
      const { data } = await httpRequest<LoginUserResponse>(
        this.baseUrl + "/login-google",
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
        this.baseUrl + "/login",
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
        this.baseUrl + "/register",
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
        this.baseUrl + "/revalidate-token",
        "GET",
      );
      return { ...data, user: userAdapter(data.user) };
    } catch (error) {
      throw error;
    }
  }
}
