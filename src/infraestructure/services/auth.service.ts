import { httpRequest } from "@/config/api";
import { RegisterUserDto } from "@/domain/dtos";
import { CreateUser } from "@/model";
import { LoginGoogleUserDto } from "../../domain/dtos/auth";
import { userAdapter } from "@/config/adapters";
import { UserEntity } from "@/domain/entities";

const baseUrl = "/auth";

type LoginUser = {
  user: UserEntity;
  token: string;
  message: string;
};

type RegisterUserResponse = {
  message: string;
};

export const loginGoogleUser = async (
  loginGoogleUserDto: LoginGoogleUserDto,
) => {
  try {
    const { data } = await httpRequest<LoginUser>(
      baseUrl + "/login-google",
      "POST",
      loginGoogleUserDto,
    );
    return { ...data, user: userAdapter(data.user) };
  } catch (error) {
    throw error;
  }
};

export const registerUser = async (
  registerUserDto: RegisterUserDto,
): Promise<CreateUser> => {
  try {
    const { data } = await httpRequest<RegisterUserResponse>(
      baseUrl + "/register",
      "POST",
      registerUserDto,
    );
    return data;
  } catch (error) {
    throw error;
  }
};
