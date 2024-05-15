import { DishCategoryEntity } from "@/domain/entities";

export const dishCategoryAdapter = (dishCategotyEntity: DishCategoryEntity) => {
  return {
    id: dishCategotyEntity.idCategory,
    name: dishCategotyEntity.name,
  };
};
