import { userAdapter } from "@/config/adapters";
import { httpRequest } from "@/config/api";
import { UpdateUserDto, UploadFileDto } from "@/domain/dtos";
import { UpdateUserResponse, UserEntity } from "@/domain/entities";
import { UpdateUserModel, UploadProfileModel, UserModel } from "@/model";

export interface IUserService {
  update(updateUserDto: UpdateUserDto): Promise<UpdateUserModel>;
  getAll(): Promise<UserModel[]>;
  uploadProfile(uploadProfileDto: UploadFileDto): Promise<UploadProfileModel>;
}

export class UserService implements IUserService {
  private prefix: string;

  constructor() {
    this.prefix = "/user";
  }

  public async update(updateUserDto: UpdateUserDto): Promise<UpdateUserModel> {
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

  public async getAll(): Promise<UserModel[]> {
    try {
      const { data } = await httpRequest<UserEntity[]>(this.prefix, "GET");
      return data.map(userAdapter);
    } catch (error) {
      throw error;
    }
  }

  public async uploadProfile({
    file,
  }: UploadFileDto): Promise<UploadProfileModel> {
    try {
      const { data } = await httpRequest<UploadProfileModel>(
        `${this.prefix}/upload-profile`,
        "POST",
        file,
      );
      return data;
    } catch (error) {
      throw error;
    }
  }
}
