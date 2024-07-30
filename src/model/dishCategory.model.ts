import { StatusEnum } from "@/domain/entities/enums";

export interface DishCategoryModel {
  id: number;
  name: string;
  imageUrl: string;
  status: StatusEnum;
  isUsed: boolean;
  createdAt: string;
  updatedAt: string;
}

export const dishCategoryEmptyState: DishCategoryModel = {
  id: 0,
  name: "",
  imageUrl: "",
  status: StatusEnum.PRIVATE,
  isUsed: false,
  createdAt: "",
  updatedAt: "",
};
