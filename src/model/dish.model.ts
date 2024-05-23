import { DishCategory } from "./";

export interface DishModel {
  id: number;
  name: string;
  description: string;
  price: number;
  img: string;
  stock: number;
  category: DishCategory;
}

export interface GetDishesModel {
  message: string;
  dishes: DishModel[];
  currentPage: number;
  totalPages: number;
  limit: number;
  total: number;
  next: string;
  previous: string;
}

export interface DishState extends DishModel {}

export const dishEmptyState: DishState = {
  id: 0,
  name: "",
  description: "",
  price: 0,
  img: "",
  stock: 0,
  category: {
    id: 0,
    name: "",
  },
};
