import { getStorage } from "@/presentation/utilities";
import type { DishCategoryModel, DishImageModel } from "./";

export interface DishModel {
  id: number;
  name: string;
  description: string;
  price: number;
  images: DishImageModel[];
  stock: number;
  createdAt: Date;
  updatedAt: Date;
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
  categories: [],
  createdAt: "" as any as Date,
  updatedAt: "" as any as Date,
};

export const dishFilterEmptyState: DishFilters = getStorage("dishFilters") || {
  idCategory: null,
  priceRange: {
    min: 0,
    max: 100,
  },
  search: "",
};
