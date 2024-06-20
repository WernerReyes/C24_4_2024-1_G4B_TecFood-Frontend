import { UpdateUserModel, UploadProfileModel, UserModel } from "@/model";
import { UpdateUserDto, UploadProfileDto } from "../dtos/user";

export interface UserRepository {
  getAll: () => Promise<UserModel[]>;
  update: (updateUserDto: UpdateUserDto) => Promise<UpdateUserModel>;
  uploadProfile: (
    uploadProfileDto: UploadProfileDto
  ) => Promise<UploadProfileModel>;
}
