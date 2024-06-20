import type { DishRepository } from "@/domain/repositories";
import type { GetDishesModel } from "@/model";
import type { GetDishesDto } from "../../dtos/dish/";

interface GetDishesUseCase {
  execute(getDishesDto: GetDishesDto): Promise<GetDishesModel>;
}

export class GetDishes implements GetDishesUseCase {
  constructor(private readonly repository: DishRepository) {}

  async execute(getDishesDto: GetDishesDto): Promise<GetDishesModel> {
    return await this.repository.getAll(getDishesDto);
  }
}