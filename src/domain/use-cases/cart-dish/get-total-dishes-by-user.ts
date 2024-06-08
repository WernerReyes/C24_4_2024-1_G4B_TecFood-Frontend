import type { CartDishRepository } from "@/domain/interfaces";
import type { GetTotalDishesByUserModel } from "@/model";

interface GetTotalDishesByUserUseCase {
  execute(): Promise<GetTotalDishesByUserModel>;
}

export class GetTotalDishesByUser implements GetTotalDishesByUserUseCase {
  constructor(private readonly repository: CartDishRepository) {}

  async execute(): Promise<GetTotalDishesByUserModel> {
    return await this.repository.getTotalDishesByUser();
  }
}
