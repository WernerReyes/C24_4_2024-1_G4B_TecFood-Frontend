import { DishCategoryModel, DishModel } from "@/model";

export const isCategotyUsed = (category: DishCategoryModel, dishes: DishModel[]) => {
  for (const dish of dishes) {
    if (dish.categories.find((c) => c.id === category.id)) {
      return true;
    }
  }
  return false;
};
