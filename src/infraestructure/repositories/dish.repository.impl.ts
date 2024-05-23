import type { DishRepository } from "@/domain/interfaces";
import type { GetDishesDto } from "@/domain/dtos";
import { DishService } from "../services";

export class DishRepositoryImpl implements DishRepository {
  constructor(private readonly dishService: DishService) {}

  async getAll(getDishesDto: GetDishesDto) {
    return await this.dishService.getAll(getDishesDto);
  }
}
