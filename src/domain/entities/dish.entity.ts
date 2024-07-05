import type { DishCategoryEntity } from "./";

export interface DishEntity {
  idDish: number;
  name: string;
  description: string;
  price: number;
  imgUrl: string;
  stock: number;
  category: DishCategoryEntity;
}
