import type { UpdateUserDto, UploadFileDto } from "@/domain/dtos";
import type { UserRepository } from "@/domain/repositories";
import type { UserService } from "../services";

export class UserRepositoryImpl implements UserRepository {
  constructor(private readonly userService: UserService) {}

  async getAll() {
    return await this.userService.getAll();
  }

  async update(updateUserDto: UpdateUserDto) {
    return await this.userService.update(updateUserDto);
  }

  async uploadProfile(uploadProfileDto: UploadFileDto) {
    return await this.userService.uploadProfile(uploadProfileDto);
  }
}
