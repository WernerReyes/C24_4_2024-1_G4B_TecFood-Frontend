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
  next: string | null;
  previous: string | null;
}

export interface GetDishesToSearchResponse
  extends Pick<GetDishesResponse, "message" | "dishes"> {}

export interface GetDishesWithoutSelectedDishResponse
  extends GetDishesToSearchResponse {}

export interface GetDishByIdResponse {
  message: string;
  dish: DishEntity;
}
