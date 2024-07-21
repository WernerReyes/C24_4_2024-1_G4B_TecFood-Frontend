import { userAdapter } from "@/config/adapters";
import { httpRequest } from "@/config/api";
import type { UpdateUserDto, UploadImageDto } from "@/domain/dtos";
import type { UserEntity } from "@/domain/entities";
import type {
  UpdateUserResponse,
  UploadProfileResponse,
  UserModel,
} from "@/model";

export interface IUserService {
  update(updateUserDto: UpdateUserDto): Promise<UpdateUserResponse>;
  getAll(): Promise<UserModel[]>;
  uploadProfile(uploadImageDto: UploadImageDto): Promise<UploadProfileResponse>;
}

export class UserService implements IUserService {
  private prefix: string;

  constructor() {
    this.prefix = "/user";
  }

  public async update(updateUserDto: UpdateUserDto) {
    try {
      const { data } = await httpRequest<UpdateUserResponse>(
        `${this.prefix}/update`,
        "PUT",
        updateUserDto,
      );
      return data;
    } catch (error) {
      throw error;
    }
  }

  public async getAll() {
    try {
      const { data } = await httpRequest<UserEntity[]>(this.prefix, "GET");
      return data.map(userAdapter);
    } catch (error) {
      throw error;
    }
  }

  public async uploadProfile(uploadImageDto: UploadImageDto) {
    try {
      const { data } = await httpRequest<UploadProfileResponse>(
        `${this.prefix}/upload-profile`,
        "POST",
        uploadImageDto.toFormData,
      );
      return data;
    } catch (error) {
      throw error;
    }
  }
}
