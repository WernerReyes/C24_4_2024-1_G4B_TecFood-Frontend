import { getStorage } from "@/presentation/utilities";
import { type DishCategoryModel, type DishImageModel } from "./";
import { StatusEnum } from "@/domain/entities/enums";

export interface DishModel {
  id: number;
  name: string;
  description: string;
  price: number;
  images: DishImageModel[];
  stock: number;
  status: StatusEnum;
  createdAt: string;
  updatedAt: string;
  categories: DishCategoryModel[];
}

export type DishFilters = {
  idCategory: { idCategory: number }[] | null;
  priceRange: { min: number; max: number };
  search: string;
};

export const dishEmptyState: DishModel = {
  id: 0,
  name: "",
  description: "",
  price: 0,
  images: [],
  stock: 0,
  status: StatusEnum.PRIVATE,
  categories: [],
  createdAt: "",
  updatedAt: "",
};

export const dishFilterEmptyState: DishFilters = getStorage("dishFilters") || {
  idCategory: null,
  priceRange: {
    min: 0,
    max: 100,
  },
  search: "",
};
