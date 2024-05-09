import { AuthRepository } from "@/domain/interfaces";
import { LoginUser } from "@/model";

interface revalidateTokenUseCase {
  execute(): Promise<LoginUser>;
}
export const revalidateToken = (
  repository: AuthRepository,
): revalidateTokenUseCase => {
  return {
    async execute(): Promise<LoginUser> {
      return await repository.revalidateToken();
    },
  };
};
