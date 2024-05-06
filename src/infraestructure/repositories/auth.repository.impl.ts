import { RegisterUserDto } from "@/domain/dtos";
import { AuthRepository } from "@/domain/interfaces";
import { loginGoogleUser, registerUser } from "@/infraestructure/services";
import { LoginGoogleUserDto } from "../../domain/dtos/auth";

export const authRepositoryImpl: AuthRepository = {
  loginGoogleUser: async (loginGoogleUserDto: LoginGoogleUserDto) =>
    loginGoogleUser(loginGoogleUserDto),
  registerUser: async (registerUserDto: RegisterUserDto) =>
    registerUser(registerUserDto),
};
