import type { DishCategoryRepository } from "@/domain/interfaces";
import { getDishCategories } from "../services";

export const dishCategoryRepositoryImpl: DishCategoryRepository = {
  getAll: async () => getDishCategories(),
};
