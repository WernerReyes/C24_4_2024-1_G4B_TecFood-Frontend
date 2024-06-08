import { UploadProfileDto } from "@/domain/dtos/user";
import { UserRepository } from "@/domain/interfaces";
import { UploadProfileModel } from "@/model";

interface UploadProfileUseCase {
  execute(uploadProfileDto: UploadProfileDto): Promise<UploadProfileModel>;
}

export class UploadProfile implements UploadProfileUseCase {
  constructor(private readonly repository: UserRepository) {}

  async execute(
    uploadProfileDto: UploadProfileDto,
  ): Promise<UploadProfileModel> {
    return await this.repository.uploadProfile(
        uploadProfileDto,
    );
  }
}
