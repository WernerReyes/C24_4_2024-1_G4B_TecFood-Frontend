import type { DishCategoryRepository } from "@/domain/repositories";
import { DishCategoryService } from "../services";

export class DishCategoryRepositoryImpl implements DishCategoryRepository {
  constructor(private readonly dishCategoryService: DishCategoryService) {}

  async getAll() {
    return await this.dishCategoryService.getAll();
  }
}
