import { UserRepository } from "@/domain/interfaces";
import { UpdateUserModel, UserModel } from "@/model";

interface UpdateUserUseCase {
  execute(user: UpdateUserModel): Promise<UserModel>;
}

export class UpdateUser implements UpdateUserUseCase {
  constructor(private readonly repository: UserRepository) {}

  async execute(user: UpdateUserModel): Promise<UserModel> {
    return await this.repository.update(user);
  }
}
