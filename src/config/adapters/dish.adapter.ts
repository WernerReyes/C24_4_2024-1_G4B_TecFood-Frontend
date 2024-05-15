import { DishEntity } from "@/domain/entities";
import { dishCategoryAdapter } from "./";
export const dishAdapter = (dishEntity: DishEntity) => {
  return {
    id: dishEntity.idProducto,
    name: dishEntity.name,
    price: dishEntity.price,
    img: dishEntity.imgUrl,
    stock: dishEntity.stock,
    category: dishCategoryAdapter(dishEntity.category),
    description: dishEntity.description,
  };
};
