import type { CartDishRepository } from "@/domain/repositories";
import type { AddOneDishModel } from "@/model";

interface AddOneDishUseCase {
  execute(dishId: number): Promise<AddOneDishModel>;
}

export class AddOneDish implements AddOneDishUseCase {
  constructor(private readonly repository: CartDishRepository) {}

  async execute(dishId: number): Promise<AddOneDishModel> {
    return await this.repository.addOneDish(dishId);
  }
}
