import type { DishCategoryEntity } from "@/domain/entities";
import type { DishCategoryModel } from "@/model";

export const dishCategoryAdapter = (
  dishCategotyEntity: DishCategoryEntity,
): DishCategoryModel => {
  return {
    id: dishCategotyEntity.id,
    name: dishCategotyEntity.name,
    createdAt: new Date(dishCategotyEntity.createdAt),
    updatedAt: new Date(dishCategotyEntity.updatedAt),
  };
};
