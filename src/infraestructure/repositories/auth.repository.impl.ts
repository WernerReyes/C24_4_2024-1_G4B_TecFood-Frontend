import type { RegisterRequest, LoginGoogleRequest, LoginRequest } from "@/domain/dtos";
import type { AuthRepository } from "@/domain/repositories";
import type { AuthService } from "@/infraestructure/services";
export class AuthRepositoryImpl implements AuthRepository {
  constructor(private readonly authService: AuthService) {}

  async loginGoogle(loginGoogleRequest: LoginGoogleRequest) {
    return await this.authService.loginGoogle(loginGoogleRequest);
  }
  async login(loginRequest: LoginRequest) {
    return await this.authService.login(loginRequest);
  }
  async register(registerRequest: RegisterRequest) {
    return await this.authService.register(registerRequest);
  }
  async revalidateToken() {
    return await this.authService.revalidateToken();
  }
}
