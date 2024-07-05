import type { DishRepository } from "@/domain/repositories";
import type {
  GetDishesDto,
  GetDishesWithoutSelectedDishDto,
} from "@/domain/dtos";
import type { DishService } from "../services";

export class DishRepositoryImpl implements DishRepository {
  constructor(private readonly dishService: DishService) {}

  async getAll(getDishesDto: GetDishesDto) {
    return await this.dishService.getAll(getDishesDto);
  }

  async getAllToSearch() {
    return await this.dishService.getAllToSearch();
  }

  async getAllWithoutSelectedDish(
    getDishesWithoutSelectedDishDto: GetDishesWithoutSelectedDishDto,
  ) {
    return await this.dishService.getAllWithoutSelectedDish(
      getDishesWithoutSelectedDishDto,
    );
  }

  async getById(id: number) {
    return await this.dishService.getById(id);
  }
}
