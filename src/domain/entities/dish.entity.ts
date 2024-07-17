import type { DishCategoryEntity, DishImageEntity } from "./";

export interface DishEntity {
  id: number;
  name: string;
  description: string;
  price: number;
  images: DishImageEntity[];
  stock: number;
  createdAt: Date;
  updatedAt: Date;
  categories: DishCategoryEntity[];
}
