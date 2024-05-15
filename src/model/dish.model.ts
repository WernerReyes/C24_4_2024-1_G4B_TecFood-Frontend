import { DishCategory } from "./";

export interface Dish {
  id: number;
  name: string;
  description: string;
  price: number;
  img: string;
  stock: number;
  category: DishCategory;
}

export interface GetDishes {
  message: string;
  dishes: Dish[];
  currentPage: number;
  totalPages: number;
  limit: number;
  total: number;
  next: string;
  previous: string;
}

export interface DishState extends Dish {}

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
