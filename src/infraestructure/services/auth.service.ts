import type { UserEntity } from "@/domain/entities";
import type {
  LoginGoogleResponse,
  LoginResponse,
  RegisterResponse,
  RevalidateTokenResponse,
  UserModel,
} from "@/model";
import { httpRequest } from "@/config/api";
import { RegisterDto, LoginGoogleDto, LoginDto } from "@/domain/dtos";
import { userAdapter } from "@/config/adapters";

interface IAuthService {
  loginGoogle(
    loginGoogleDto: LoginGoogleDto,
  ): Promise<LoginGoogleResponse<UserModel>>;
  login(loginDto: LoginDto): Promise<LoginResponse<UserModel>>;
  register(registerDto: RegisterDto): Promise<RegisterResponse>;
  revalidateToken(): Promise<RevalidateTokenResponse<UserModel>>;
}

export class AuthService implements IAuthService {
  private prefix: string;

  constructor() {
    this.prefix = "/auth";
  }

  public async loginGoogle(loginGoogleDto: LoginGoogleDto) {
    try {
      const { data } = await httpRequest<LoginGoogleResponse<UserEntity>>(
        this.prefix + "/login-google",
        "POST",
        loginGoogleDto,
      );

      return { ...data, user: userAdapter(data.user) };
    } catch (error) {
      throw error;
    }
  }

  public async login(loginDto: LoginDto) {
    try {
      const { data } = await httpRequest<LoginResponse<UserEntity>>(
        this.prefix + "/login",
        "POST",
        loginDto,
      );
      return { ...data, user: userAdapter(data.user) };
    } catch (error) {
      throw error;
    }
  }

  public async register(registerDto: RegisterDto) {
    try {
      const { data } = await httpRequest<RegisterResponse>(
        this.prefix + "/register",
        "POST",
        registerDto,
      );
      return data;
    } catch (error) {
      throw error;
    }
  }

  public async revalidateToken() {
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
