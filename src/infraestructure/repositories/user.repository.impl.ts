import { UserRepository } from "@/domain/repositories";
import { UpdateUserModel, UploadProfileModel, UserModel } from "@/model";
import { UserService } from "../services";
import { UpdateUserDto, UploadFileDto } from "@/domain/dtos";

export class UserRepositoryImpl implements UserRepository {
  constructor(private readonly userService: UserService) {}

  async getAll(): Promise<UserModel[]> {
    return await this.userService.getAll();
  }

  async update(updateUserDto: UpdateUserDto): Promise<UpdateUserModel> {
    return await this.userService.update(updateUserDto);
  }

  async uploadProfile(uploadProfileDto: UploadFileDto): Promise<UploadProfileModel> {
    return await this.userService.uploadProfile(uploadProfileDto);
  }
}
