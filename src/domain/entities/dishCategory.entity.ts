import type { StatusEnum } from "./enums";
export interface DishCategoryEntity {
  id: number;
  name: string;
  imageUrl: string;
  status: StatusEnum;
  createdAt: Date;
  updatedAt: Date;
}
