import { userAdapter } from "@/config/adapters";
import { httpRequest } from "@/config/api";
import { UserEntity } from "@/domain/entities";
import { UpdateUser, User } from "@/model";

const baseURL = "/users";

export const updateUser = async (user: UpdateUser): Promise<User> => {
  try {
    const { data } = await httpRequest<UserEntity>(
      `${baseURL}/${user.id}`,
      "PUT",
      user,
    );
    return userAdapter(data);
  } catch (error) {
    throw error;
  }
};

export const getAllUsers = async (): Promise<User[]> => {
  try {
    const { data } = await httpRequest<UserEntity[]>(baseURL, "GET");
    return data.map(userAdapter);
  } catch (error) {
    throw error;
  }
};
