import { UserRepository } from "@/domain/interfaces";
import { UpdateUserModel, UserModel } from "@/model";
import { UserService } from "../services";

export class UserRepositoryImpl implements UserRepository {
  constructor(private readonly userService: UserService) {}

  async getAll(): Promise<UserModel[]> {
    return await this.userService.getAll();
  }

  async update(updateUserModel: UpdateUserModel): Promise<UpdateUserModel> {
    return await this.userService.update(updateUserModel);
  }
}
