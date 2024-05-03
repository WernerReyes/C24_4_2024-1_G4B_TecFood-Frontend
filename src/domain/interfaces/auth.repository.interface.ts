import { User } from "@/model";
import { RegisterUserDto } from "../dtos";

export interface AuthRepository {
  registerUser: (registerUserDto: RegisterUserDto) => Promise<User>;
}
