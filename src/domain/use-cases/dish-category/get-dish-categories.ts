import type { DishCategoryRepository } from "@/domain/interfaces";
import type { GetDishCategories } from "@/model";

interface GetDishesCategoryUseCase {
  execute(): Promise<GetDishCategories>;
}

export const getDishesCategory = (
  repository: DishCategoryRepository,
): GetDishesCategoryUseCase => {
  return {
    async execute(): Promise<GetDishCategories> {
      return await repository.getAll();
    },
  };
};
