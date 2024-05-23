import type { AuthRepository } from "@/domain/interfaces";
import type { LoginUserModel } from "@/model";

interface RevalidateTokenUseCase {
  execute(): Promise<LoginUserModel>;
}
export class RevalidateToken implements RevalidateTokenUseCase {
  constructor(private readonly repository: AuthRepository) {}

  async execute(): Promise<LoginUserModel> {
    return await this.repository.revalidateToken();
  }
}
