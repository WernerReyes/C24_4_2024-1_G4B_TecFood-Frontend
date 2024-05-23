import { userAdapter } from "@/config/adapters";
import { httpRequest } from "@/config/api";
import { UserEntity } from "@/domain/entities";
import { UpdateUserModel, UserModel } from "@/model";

export interface IUserService {
  update(updateUserModel: UpdateUserModel): Promise<UserModel>;
  getAll(): Promise<UserModel[]>;
}

export class UserService implements IUserService {
  private baseURL = "/user";
  public async update(updateUserModel: UpdateUserModel): Promise<UserModel> {
    try {
      const { data } = await httpRequest<UserEntity>(
        `${this.baseURL}/${updateUserModel.id}`,
        "PUT",
        updateUserModel,
      );
      return userAdapter(data);
    } catch (error) {
      throw error;
    }
  }

  public async getAll(): Promise<UserModel[]> {
    try {
      const { data } = await httpRequest<UserEntity[]>(this.baseURL, "GET");
      return data.map(userAdapter);
    } catch (error) {
      throw error;
    }
  }
}
