import type { DishCategoryEntity } from "@/domain/entities";
import type { DishCategoryModel, GetDishCategoriesResponse } from "@/model";
import { dishCategoryAdapter } from "@/config/adapters";
import { httpRequest } from "@/config/api";

interface IDishCategoryService {
  getAll(): Promise<GetDishCategoriesResponse<DishCategoryModel>>;
}

export class DishCategoryService implements IDishCategoryService {
  private prefix: string;

  constructor() {
    this.prefix = "/dish-category";
  }

  public async getAll() {
    try {
      const { data } = await httpRequest<
        GetDishCategoriesResponse<DishCategoryEntity>
      >(this.prefix, "GET");
      return {
        ...data,
        dishCategories: data.dishCategories.map(dishCategoryAdapter),
      };
    } catch (error) {
      throw error;
    }
  }
}
