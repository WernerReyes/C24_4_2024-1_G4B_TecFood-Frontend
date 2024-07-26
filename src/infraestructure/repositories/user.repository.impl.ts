import type { UpdateUserRequest, UploadImageRequest } from "@/domain/dtos";
import type { UserRepository } from "@/domain/repositories";
import type { UserService } from "../services";

export class UserRepositoryImpl implements UserRepository {
  constructor(private readonly userService: UserService) {}

  async getAll() {
    return await this.userService.getAll();
  }

  async update(updateUserRequest: UpdateUserRequest) {
    return await this.userService.update(updateUserRequest);
  }

  async uploadProfile(uploadImageRequest: UploadImageRequest) {
    return await this.userService.uploadProfile(uploadImageRequest);
  }
}
