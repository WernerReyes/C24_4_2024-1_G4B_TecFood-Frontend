import { UserRepository } from "@/domain/interfaces";
import { UserModel } from "@/model";

interface GetUsersUseCase {
  execute(): Promise<UserModel[]>;
}

export class GetUsers implements GetUsersUseCase {
  constructor(private readonly repository: UserRepository) {}

  async execute(): Promise<UserModel[]> {
    return await this.repository.getAll();
  }
}
