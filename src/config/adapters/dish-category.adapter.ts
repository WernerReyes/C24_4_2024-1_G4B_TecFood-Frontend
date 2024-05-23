import type { DishCategoryEntity } from "@/domain/entities";
import type { DishCategoryModel } from "@/model";

export const dishCategoryAdapter = (
  dishCategotyEntity: DishCategoryEntity,
): DishCategoryModel => {
  return {
    id: dishCategotyEntity.idDishCategory,
    name: dishCategotyEntity.name,
  };
};
