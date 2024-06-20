import type { GetDishCategoriesResponse } from "@/domain/entities";
import type { GetDishCategoriesModel } from "@/model";
import { dishCategoryAdapter } from "@/config/adapters";
import { httpRequest } from "@/config/api";

interface IDishCategoryService {
  getAll(): Promise<GetDishCategoriesModel>;
}

export class DishCategoryService implements IDishCategoryService {
  private prefix: string;

  constructor() {
    this.prefix = "/dish-category";
  }


  public async getAll(): Promise<GetDishCategoriesModel> {
    try {
      const { data } = await httpRequest<GetDishCategoriesResponse>(
        this.prefix,
        "GET",
      );
      
      return {
        ...data,
        dishCategories: data.dishCategories.map(dishCategoryAdapter),
      };
    } catch (error) {
      throw error;
    }
  }
}
