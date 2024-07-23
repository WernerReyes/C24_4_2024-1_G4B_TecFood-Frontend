import type { DishEntity } from "@/domain/entities";
import type { DishModel } from "@/model";
import { dishCategoryAdapter, dishImageAdapter } from "./";
import { convertDateToShortString } from "@/presentation/utilities";
export const dishAdapter = (dishEntity: DishEntity): DishModel => {
  return {
    id: dishEntity.id,
    name: dishEntity.name,
    price: dishEntity.price,
    images: dishEntity.images.map(dishImageAdapter),
    stock: dishEntity.stock,
    description: dishEntity.description,
    createdAt: convertDateToShortString(dishEntity.createdAt),
    updatedAt: convertDateToShortString(dishEntity.updatedAt),
    categories: dishEntity.categories.map(dishCategoryAdapter),
  };
};
