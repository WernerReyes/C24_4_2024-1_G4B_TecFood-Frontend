import { UpdateUserDto } from "@/domain/dtos";
import { UserRepository } from "@/domain/interfaces";
import { UpdateUserModel } from "@/model";

interface UpdateUserUseCase {
  execute(updateUserDto: UpdateUserDto): Promise<UpdateUserModel>;
}

export class UpdateUser implements UpdateUserUseCase {
  constructor(private readonly repository: UserRepository) {}

  async execute(updateUserDto: UpdateUserDto): Promise<UpdateUserModel> {
    return await this.repository.update(updateUserDto);
  }
}
