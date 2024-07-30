import { StatusEnum } from "@/domain/entities/enums";

export interface DishCategoryModel {
  id: number;
  name: string;
  imageUrl: string;
  status: StatusEnum;
  createdAt: string;
  updatedAt: string;
}

export const dishCategoryEmptyState: DishCategoryModel = {
  id: 0,
  name: "",
  imageUrl: "",
  status: StatusEnum.DRAFT,
  createdAt: "",
  updatedAt: "",
};
