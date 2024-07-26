import { userAdapter } from "@/config/adapters";
import { httpRequest } from "@/config/api";
import type { ApiResponse, UpdateUserDto, UploadImageDto } from "@/domain/dtos";
import type { UserEntity } from "@/domain/entities";
import type { UserModel } from "@/model";

export interface IUserService {
  update(updateUserDto: UpdateUserDto): Promise<ApiResponse<UserModel>>;
  uploadProfile(uploadImageDto: UploadImageDto): Promise<ApiResponse<string>>;
  getAll(): Promise<ApiResponse<UserModel[]>>;
}

export class UserService implements IUserService {
  private prefix: string;

  constructor() {
    this.prefix = "/user";
  }

  public async update(updateUserDto: UpdateUserDto) {
    try {
      const { data, ...rest } = await httpRequest<UserEntity>(
        `${this.prefix}/update`,
        "PUT",
        updateUserDto,
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

  public async uploadProfile(uploadImageDto: UploadImageDto) {
    try {
      return await httpRequest<string>(
        `${this.prefix}/upload-profile`,
        "POST",
        uploadImageDto.toFormData,
      );
    } catch (error) {
      throw error;
    }
  }
}
