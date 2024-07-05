import type {
  UpdateUserResponse,
  UploadProfileResponse,
  UserModel,
} from "@/model";
import type { UpdateUserDto, UploadProfileDto } from "../dtos/user";

export abstract class UserRepository {
  abstract getAll: () => Promise<UserModel[]>;
  abstract update: (
    updateUserDto: UpdateUserDto,
  ) => Promise<UpdateUserResponse>;
  abstract uploadProfile: (
    uploadProfileDto: UploadProfileDto,
  ) => Promise<UploadProfileResponse>;
}
