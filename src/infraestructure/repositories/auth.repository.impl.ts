import { RegisterUserDto } from "@/domain/dtos";
import { AuthRepository } from "@/domain/interfaces";
import { registerUser } from "@/infraestructure/services";

export const authRepositoryImpl: AuthRepository = {
  registerUser: async (registerUserDto: RegisterUserDto) =>
    registerUser(registerUserDto),
};
