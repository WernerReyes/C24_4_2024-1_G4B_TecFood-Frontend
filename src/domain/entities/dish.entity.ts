import type { DishCategoryEntity, DishImageEntity } from "./";
import type { StatusEnum } from "./enums";

export interface DishEntity {
  id: number;
  name: string;
  description: string;
  price: number;
  images: DishImageEntity[];
  stock: number;
  status: StatusEnum;
  createdAt: Date;
  updatedAt: Date;
  categories: DishCategoryEntity[];
}
