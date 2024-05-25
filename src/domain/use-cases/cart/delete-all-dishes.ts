import type { CartRepository } from "@/domain/interfaces";
import type { DeleteAllDishesModel } from "@/model";

interface DeleteAllDishesUseCase {
  execute(cartId: number): Promise<DeleteAllDishesModel>;
}

export class DeleteAllDishes implements DeleteAllDishesUseCase {
  constructor(private readonly repository: CartRepository) {}

  async execute(cartId: number): Promise<DeleteAllDishesModel> {
    return await this.repository.deleteAllDishes(cartId);
  }
}
