import type { UserModel } from "@/model";
import type { ApiResponse, UpdateUserDto, UploadImageDto } from "../dtos";

export abstract class UserRepository {
  abstract update(
    updateUserDto: UpdateUserDto,
  ): Promise<ApiResponse<UserModel>>;
  abstract uploadProfile(
    uploadImageDto: UploadImageDto,
  ): Promise<ApiResponse<string>>;
  abstract getAll(): Promise<ApiResponse<UserModel[]>>;
}
