import { dishCategoryAdapter } from "@/config/adapters";
import { httpRequest } from "@/config/api";
import type { GetDishCategoriesResponse } from "@/domain/entities";
import type { GetDishCategories } from "@/model";

const baseUrl = "/dish-category";

export const getDishCategories = async (): Promise<GetDishCategories> => {
  try {
    const { data } = await httpRequest<GetDishCategoriesResponse>(
      baseUrl,
      "GET",
    );
    return {
      ...data,
      dishCategories: data.dishCategories.map(dishCategoryAdapter),
    };
  } catch (error) {
    throw error;
  }
};
