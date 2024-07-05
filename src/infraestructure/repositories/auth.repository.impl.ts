import type { RegisterUserDto, LoginGoogleUserDto, LoginUserDto } from "@/domain/dtos";
import type { AuthRepository } from "@/domain/repositories";
import type { AuthService } from "@/infraestructure/services";
export class AuthRepositoryImpl implements AuthRepository {
  constructor(private readonly authService: AuthService) {}

  async loginGoogle(loginGoogleUserDto: LoginGoogleUserDto) {
    return await this.authService.loginGoogle(loginGoogleUserDto);
  }
  async login(loginUserDto: LoginUserDto) {
    return await this.authService.login(loginUserDto);
  }
  async register(registerUserDto: RegisterUserDto) {
    return await this.authService.register(registerUserDto);
  }
  async revalidateToken() {
    return await this.authService.revalidateToken();
  }
}
