import type { CartRepository } from "@/domain/interfaces";
import type { GetDishByDishIdModel } from "@/model";

interface GetDishByDishIdUseCase {
  execute(dishId: number): Promise<GetDishByDishIdModel>;
}

export class GetDishByDishId implements GetDishByDishIdUseCase {
  constructor(private readonly repository: CartRepository) {}

  async execute(dishId: number): Promise<GetDishByDishIdModel> {
    return await this.repository.getDishByDishId(dishId);
  }
}
