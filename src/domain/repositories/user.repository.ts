import type {
  UpdateUserResponse,
  UploadProfileResponse,
  UserModel,
} from "@/model";
import type { UploadImageDto, UpdateUserDto } from "../dtos";

export abstract class UserRepository {
  abstract getAll: () => Promise<UserModel[]>;
  abstract update: (
    updateUserDto: UpdateUserDto,
  ) => Promise<UpdateUserResponse>;
  abstract uploadProfile: (
    uploadImageDto: UploadImageDto
  ) => Promise<UploadProfileResponse>;
}
