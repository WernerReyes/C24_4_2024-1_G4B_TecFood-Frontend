import { RegisterUserDto } from "@/domain/dtos";
import { AuthRepository } from "@/domain/repositories";
import { AuthService } from "@/infraestructure/services";
import { LoginGoogleUserDto, LoginUserDto } from "../../domain/dtos/auth";

export class AuthRepositoryImpl implements AuthRepository {
  constructor(private readonly authService: AuthService) {}

  async loginGoogleUser(loginGoogleUserDto: LoginGoogleUserDto) {
    return await this.authService.loginGoogle(loginGoogleUserDto);
  }
  async loginUser(loginUserDto: LoginUserDto) {
    return await this.authService.login(loginUserDto);
  }
  async registerUser(registerUserDto: RegisterUserDto) {
    return await this.authService.register(registerUserDto);
  }
  async revalidateToken() {
    return await this.authService.revalidateToken();
  }
}
