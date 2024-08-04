import { getStorage } from "@/presentation/utilities";
import { type DishCategoryModel, type DishImageModel } from "./";
import { StatusEnum } from "@/domain/entities/enums";

export interface DishModel {
  readonly id: number;
  readonly name: string;
  readonly description: string;
  readonly price: number;
  readonly images: DishImageModel[];
  readonly stock: number;
  readonly status: StatusEnum;
  readonly discountPrice: number;
  readonly discountPercentage: number;
  readonly saleStartDate: Date;
  readonly saleEndDate: Date;
  readonly isUsed: boolean;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly categories: DishCategoryModel[];
}

export type DishFilters = {
  readonly idCategory: { idCategory: number }[] | null;
  readonly priceRange: { min: number; max: number };
  readonly search: string;
};

export const dishEmptyState: DishModel = {
  id: 0,
  name: "",
  description: "",
  price: 0,
  images: [],
  stock: 0,
  status: StatusEnum.PRIVATE,
  discountPrice: 0,
  discountPercentage: 0,
  saleStartDate: "" as any as Date,
  saleEndDate: "" as any as Date,
  isUsed: false,
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
