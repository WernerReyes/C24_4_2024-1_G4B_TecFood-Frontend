import type { DishRepository } from "@/domain/interfaces";
import type { GetDishByIdModel } from "@/model";

interface GetDishByIdUseCase {
  execute(id: number): Promise<GetDishByIdModel>;
}

export class GetDishById implements GetDishByIdUseCase {
  constructor(private readonly repository: DishRepository) {}

  async execute(id: number): Promise<GetDishByIdModel> {
    return await this.repository.getById(id);
  }
}
