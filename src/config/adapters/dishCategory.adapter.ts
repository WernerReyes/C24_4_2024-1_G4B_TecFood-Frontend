import type { DishCategoryEntity } from "@/domain/entities";
import type { DishCategoryModel } from "@/model";
import { convertDateToShortString } from "@/presentation/utilities";

export const dishCategoryAdapter = (
  dishCategotyEntity: DishCategoryEntity,
): DishCategoryModel => {
  return {
    id: dishCategotyEntity.id,
    name: dishCategotyEntity.name,
    imageUrl: dishCategotyEntity.imageUrl,
    status: dishCategotyEntity.status,
    isUsed: dishCategotyEntity.isUsed,
    createdAt: convertDateToShortString(dishCategotyEntity.createdAt),
    updatedAt: convertDateToShortString(dishCategotyEntity.updatedAt),
  };
};
