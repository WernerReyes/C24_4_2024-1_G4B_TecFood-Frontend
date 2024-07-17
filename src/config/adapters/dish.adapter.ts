import type { DishEntity } from "@/domain/entities";
import type { DishModel } from "@/model";
import { dishCategoryAdapter } from "./";
export const dishAdapter = (dishEntity: DishEntity): DishModel => {
  return {
    id: dishEntity.id,
    name: dishEntity.name,
    price: dishEntity.price,
    images: dishEntity.images,
    stock: dishEntity.stock,
    description: dishEntity.description,
    createdAt: dishEntity.createdAt,
    updatedAt: dishEntity.updatedAt,
    categories: dishEntity.categories.map(dishCategoryAdapter),
  };
};
