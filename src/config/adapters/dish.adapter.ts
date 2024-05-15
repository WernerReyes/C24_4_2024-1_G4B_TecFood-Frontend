import type { DishEntity } from "@/domain/entities";
import type { Dish } from "@/model";
import { dishCategoryAdapter } from "./";
export const dishAdapter = (dishEntity: DishEntity): Dish => {
  return {
    id: dishEntity.idDish,
    name: dishEntity.name,
    price: dishEntity.price,
    img: dishEntity.imgUrl,
    stock: dishEntity.stock,
    category: dishCategoryAdapter(dishEntity.category),
    description: dishEntity.description,
  };
};
