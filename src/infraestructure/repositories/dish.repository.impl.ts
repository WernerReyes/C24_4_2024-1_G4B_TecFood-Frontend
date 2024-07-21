import type {
  CreateDishDto,
  GetDishesDto,
  GetDishesWithoutSelectedDishDto,
  UpdateDishDto,
  UpdateDishImageDto,
  UploadImageDto,
} from "@/domain/dtos";
import type { DishRepository } from "@/domain/repositories";
import type { DishService } from "../services";

export class DishRepositoryImpl implements DishRepository {
  constructor(private readonly dishService: DishService) {}

  async create(createDishDto: CreateDishDto, uploadDishImages: UploadImageDto) {
    return await this.dishService.create(createDishDto, uploadDishImages);
  }

  async update(updateDishDto: UpdateDishDto) {
    return await this.dishService.update(updateDishDto);
  }

  async updateImage(updateDishImageDto: UpdateDishImageDto) {
    return await this.dishService.updateImage(updateDishImageDto);
  }

  async delete(id: number) {
    return await this.dishService.delete(id);
  }

  async deleteMany(ids: number[]) {
    return await this.dishService.deleteMany(ids);
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
