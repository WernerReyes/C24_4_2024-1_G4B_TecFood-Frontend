import type { DishCategoryRepository } from "@/domain/repositories";
import type { GetDishCategoriesModel } from "@/model";

interface GetDishCategoriesUseCase {
  execute(): Promise<GetDishCategoriesModel>;
}

export class GetDishCategories implements GetDishCategoriesUseCase {
  constructor(private readonly repository: DishCategoryRepository) {}

  async execute(): Promise<GetDishCategoriesModel> {
    return await this.repository.getAll();
  }
}
