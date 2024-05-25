import type { CartRepository } from "@/domain/interfaces";
import type { GetDishesByUserModel } from "@/model";

interface GetDishesByUserUseCase {
  execute(): Promise<GetDishesByUserModel>;
}

export class GetDishesByUser implements GetDishesByUserUseCase {
  constructor(private readonly repository: CartRepository) {}

  async execute(): Promise<GetDishesByUserModel> {
    return await this.repository.getDishesByUser();
  }
}
