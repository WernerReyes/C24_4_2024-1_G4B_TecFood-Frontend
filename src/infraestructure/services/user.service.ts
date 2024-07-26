import { userAdapter } from "@/config/adapters";
import { httpRequest } from "@/config/api";
import type { ApiResponse, UpdateUserRequest, UploadImageRequest } from "@/domain/dtos";
import type { UserEntity } from "@/domain/entities";
import type { UserModel } from "@/model";

export interface IUserService {
  update(updateUserRequest: UpdateUserRequest): Promise<ApiResponse<UserModel>>;
  uploadProfile(uploadImageRequest: UploadImageRequest): Promise<ApiResponse<string>>;
  getAll(): Promise<ApiResponse<UserModel[]>>;
}

export class UserService implements IUserService {
  private prefix: string;

  constructor() {
    this.prefix = "/user";
  }

  public async update(updateUserRequest: UpdateUserRequest) {
    try {
      const { data, ...rest } = await httpRequest<UserEntity>(
        `${this.prefix}/update`,
        "PUT",
        updateUserRequest,
      );
      return { data: userAdapter(data), ...rest };
    } catch (error) {
      throw error;
    }
  }

  public async getAll() {
    try {
      const { data, ...rest } = await httpRequest<UserEntity[]>(
        this.prefix,
        "GET",
      );
      return { data: data.map(userAdapter), ...rest };
    } catch (error) {
      throw error;
    }
  }

  public async uploadProfile(uploadImageRequest: UploadImageRequest) {
    try {
      return await httpRequest<string>(
        `${this.prefix}/upload-profile`,
        "POST",
        uploadImageRequest.toFormData,
      );
    } catch (error) {
      throw error;
    }
  }
}
