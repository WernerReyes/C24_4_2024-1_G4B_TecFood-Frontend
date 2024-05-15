import { DishEntity } from "@/domain/entities";
export const dishAdapter = (dishEntity: DishEntity) => {
  return {
    id: dishEntity.idProducto,
    name: dishEntity.name,
    price: dishEntity.price,
    img: dishEntity.imgUrl,
    stock: dishEntity.stock,
    category: dishEntity.category,
    description: dishEntity.description,
  };
};
