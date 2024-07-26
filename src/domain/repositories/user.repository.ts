import type { UserModel } from "@/model";
import type { ApiResponse, UpdateUserRequest, UploadImageRequest } from "../dtos";

export abstract class UserRepository {
  abstract update(
    updateUserRequest: UpdateUserRequest,
  ): Promise<ApiResponse<UserModel>>;
  abstract uploadProfile(
    uploadImageRequest: UploadImageRequest,
  ): Promise<ApiResponse<string>>;
  abstract getAll(): Promise<ApiResponse<UserModel[]>>;
}
