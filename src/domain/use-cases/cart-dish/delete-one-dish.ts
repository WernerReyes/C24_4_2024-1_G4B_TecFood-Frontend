import type { CartDishRepository } from "@/domain/interfaces";
import type { DeleteOneDishModel } from "@/model";

interface DeleteOneDishUseCase {
  execute(dishId: number): Promise<DeleteOneDishModel>;
}

export class DeleteOneDish implements DeleteOneDishUseCase {
  constructor(private readonly repository: CartDishRepository) {}

  async execute(dishId: number): Promise<DeleteOneDishModel> {
    return await this.repository.deleteOneDish(dishId);
  }
}
