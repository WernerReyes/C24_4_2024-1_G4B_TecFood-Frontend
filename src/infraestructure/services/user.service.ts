import { httpRequest } from "@/config/api";
import { UpdateUser, User } from "@/model";

const baseURL = "/users";

export const updateUser = async (user: UpdateUser): Promise<User> => {
  try {
    const { data } = await httpRequest<User>(
      `${baseURL}/${user.id}`,
      "PUT",
      user,
    );
    return data;
  } catch (error) {
    throw error;
  }
};

export const getAllUsers = async (): Promise<User[]> => {
  try {
    const { data } = await httpRequest<User[]>(baseURL, "GET");
    return data;
  } catch (error) {
    throw error;
  }
};
