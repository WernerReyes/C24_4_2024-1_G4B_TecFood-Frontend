import type { UserEntity } from "@/domain/entities";
import type { CreateUser, LoginUser } from "@/model";
import { httpRequest } from "@/config/api";
import {
  RegisterUserDto,
  LoginGoogleUserDto,
  LoginUserDto,
} from "@/domain/dtos";
import { userAdapter } from "@/config/adapters";

const baseUrl = "/auth";

type LoginUserResponse = {
  user: UserEntity;
  token: string;
  message: string;
};

type RegisterUserResponse = {
  message: string;
};

export const loginGoogleUser = async (
  loginGoogleUserDto: LoginGoogleUserDto,
): Promise<LoginUser> => {
  try {
    const { data } = await httpRequest<LoginUserResponse>(
      baseUrl + "/login-google",
      "POST",
      loginGoogleUserDto,
    );
    return { ...data, user: userAdapter(data.user) };
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (
  loginUserDto: LoginUserDto,
): Promise<LoginUser> => {
  try {
    const { data } = await httpRequest<LoginUserResponse>(
      baseUrl + "/login",
      "POST",
      loginUserDto,
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

export const revalidateToken = async (): Promise<LoginUser> => {
  try {
    const { data } = await httpRequest<LoginUserResponse>(
      baseUrl + "/revalidate-token",
      "GET",
    );
    return { ...data, user: userAdapter(data.user) };
  } catch (error) {
    throw error;
  }
};
