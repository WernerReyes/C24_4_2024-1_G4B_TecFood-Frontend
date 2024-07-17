import type { DishRepository } from "@/domain/repositories";
import type {
  CreateDishDto,
  GetDishesDto,
  GetDishesWithoutSelectedDishDto,
  UploadImageDto,
} from "@/domain/dtos";
import type { DishService } from "../services";

export class DishRepositoryImpl implements DishRepository {
  constructor(private readonly dishService: DishService) {}

  async create(createDishDto: CreateDishDto, uploadDishImages: UploadImageDto) {
    return await this.dishService.create(createDishDto, uploadDishImages);
  }

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
