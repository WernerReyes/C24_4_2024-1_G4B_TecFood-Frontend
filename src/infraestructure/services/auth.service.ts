import { userAdapter } from "@/config/adapters";
import { httpRequest } from "@/config/api";
import { RegisterUserDto } from "@/domain/dtos";
import { UserEntity } from "@/domain/entities";
import { User } from "@/model";

const baseUrl = "/user";

export const registerUser = async (
  registerUserDto: RegisterUserDto,
): Promise<User> => {
  console.log(registerUserDto);
  try {
    const { data } = await httpRequest<UserEntity>(
      baseUrl,
      "POST",
      registerUserDto,
    );
    console.log(data);
    return userAdapter(data);
  } catch (error) {
    throw error;
  }

 
};
