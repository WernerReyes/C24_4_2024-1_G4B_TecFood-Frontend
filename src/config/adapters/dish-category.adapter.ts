import type { DishCategoryEntity } from "@/domain/entities";
import type { DishCategory } from "@/model";

export const dishCategoryAdapter = (
  dishCategotyEntity: DishCategoryEntity,
): DishCategory => {
  return {
    id: dishCategotyEntity.idDishCategory,
    name: dishCategotyEntity.name,
  };
};
