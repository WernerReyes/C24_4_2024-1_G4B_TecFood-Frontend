import type { DishImageEntity } from "@/domain/entities";
import type { DishImageModel } from "@/model";

export const dishImageAdapter = (
  dishImageEntity: DishImageEntity,
): DishImageModel => {
  return {
    id: dishImageEntity.id,
    url: dishImageEntity.url,
  };
};
