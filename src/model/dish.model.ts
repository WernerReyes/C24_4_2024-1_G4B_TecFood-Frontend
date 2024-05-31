import { getStorage } from "@/presentation/utilities";
import { DishCategoryModel, dishCategoryEmptyState } from "./";

export interface DishModel {
  id: number;
  name: string;
  description: string;
  price: number;
  img: string;
  stock: number;
  category: DishCategoryModel;
}

export interface GetDishesModel {
  message: string;
  dishes: DishModel[];
  currentPage: number;
  totalPages: number;
  limit: number;
  total: number;
  next: string | null;
  previous: string | null;
}

export interface GetDishesToSearchModel
  extends Pick<GetDishesModel, "message" | "dishes"> {}

export interface DishState extends DishModel {}

export type DishFilters = {
  idCategory: { idCategory: number }[] | null;
  priceRange: { min: number; max: number };
  search: string;
};

export const dishEmptyState: DishState = {
  id: 0,
  name: "",
  description: "",
  price: 0,
  img: "",
  stock: 0,
  category: dishCategoryEmptyState,
};

export const dishFilterEmptyState: DishFilters = getStorage("dishFilters") || {
  idCategory: null,
  priceRange: {
    min: 0,
    max: 100,
  },
  search: "",
};
