import { DishCategoryEntity } from "./";

export interface DishEntity {
  idDish: number;
  name: string;
  description: string;
  price: number;
  imgUrl: string;
  stock: number;
  category: DishCategoryEntity;
}

export interface GetDishesResponse {
  message: string;
  dishes: DishEntity[];
  currentPage: number;
  totalPages: number;
  limit: number;
  total: number;
  next: string;
  previous: string;
}