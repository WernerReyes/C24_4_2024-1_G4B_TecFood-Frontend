import type {
  CreateDishRequest,
  GetDishesRequest,
  GetDishesWithoutSelectedDishRequest,
  UpdateDishRequest,
  UpdateDishImageRequest,
  UploadImageRequest,
} from "@/domain/dtos";
import type { DishRepository } from "@/domain/repositories";
import type { DishService } from "../services";

export class DishRepositoryImpl implements DishRepository {
  constructor(private readonly dishService: DishService) {}

  async create(createDishRequest: CreateDishRequest, uploadDishImages: UploadImageRequest) {
    return await this.dishService.create(createDishRequest, uploadDishImages);
  }

  async update(updateDishRequest: UpdateDishRequest) {
    return await this.dishService.update(updateDishRequest);
  }

  async updateImage(updateDishImageRequest: UpdateDishImageRequest) {
    return await this.dishService.updateImage(updateDishImageRequest);
  }

  async delete(id: number) {
    return await this.dishService.delete(id);
  }

  async deleteMany(ids: number[]) {
    return await this.dishService.deleteMany(ids);
  }

  async getAllPaginated(getDishesRequest: GetDishesRequest) {
    return await this.dishService.getAllPaginated(getDishesRequest);
  }

  async getAll() {
    return await this.dishService.getAll();
  }

  async getAllWithoutSelectedDish(
    getDishesWithoutSelectedDishRequest: GetDishesWithoutSelectedDishRequest,
  ) {
    return await this.dishService.getAllWithoutSelectedDish(
      getDishesWithoutSelectedDishRequest,
    );
  }

  async getById(id: number) {
    return await this.dishService.getById(id);
  }
}
