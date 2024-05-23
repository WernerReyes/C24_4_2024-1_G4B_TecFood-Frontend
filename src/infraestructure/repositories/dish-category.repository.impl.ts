import type { DishCategoryRepository } from "@/domain/interfaces";
import { DishCategoryService } from "../services";

export class DishCategoryRepositoryImpl implements DishCategoryRepository {
  constructor(private readonly dishCategoryService: DishCategoryService) {}

  async getAll() {
    return await this.dishCategoryService.getAll();
  }
}
