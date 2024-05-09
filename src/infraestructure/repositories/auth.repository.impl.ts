import { RegisterUserDto } from "@/domain/dtos";
import { AuthRepository } from "@/domain/interfaces";
import {
  loginGoogleUser,
  loginUser,
  registerUser,
  revalidateToken,
} from "@/infraestructure/services";
import { LoginGoogleUserDto, LoginUserDto } from "../../domain/dtos/auth";

export const authRepositoryImpl: AuthRepository = {
  loginGoogleUser: async (loginGoogleUserDto: LoginGoogleUserDto) =>
    loginGoogleUser(loginGoogleUserDto),
  loginUser: async (loginUserDto: LoginUserDto) => loginUser(loginUserDto),
  registerUser: async (registerUserDto: RegisterUserDto) =>
    registerUser(registerUserDto),
  revalidateToken: async () => revalidateToken(),
};
