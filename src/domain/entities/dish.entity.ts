import { DishCategoryEntity } from "./";

export interface DishEntity {
  idProducto: number;
  name: string;
  description: string;
  price: number;
  imgUrl: string;
  stock: number;
  category: DishCategoryEntity;
}
