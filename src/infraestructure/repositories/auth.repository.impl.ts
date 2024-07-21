import type { RegisterDto, LoginGoogleDto, LoginDto } from "@/domain/dtos";
import type { AuthRepository } from "@/domain/repositories";
import type { AuthService } from "@/infraestructure/services";
export class AuthRepositoryImpl implements AuthRepository {
  constructor(private readonly authService: AuthService) {}

  async loginGoogle(loginGoogleDto: LoginGoogleDto) {
    return await this.authService.loginGoogle(loginGoogleDto);
  }
  async login(loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }
  async register(registerDto: RegisterDto) {
    return await this.authService.register(registerDto);
  }
  async revalidateToken() {
    return await this.authService.revalidateToken();
  }
}
