import { DishEntity } from "./dish.entity";
import { UserEntity } from "./user.entity";

// <------------------ ENTITY ( Model BackEnd ) ------------------>
export interface CartDishEntity {
  idCart: number;
  quantity: number;
  dish: DishEntity;
  user: UserEntity;
}

// <------------------ RESPONSE ------------------>
export interface AddOneDishResponse {
  message: string;
  cartItem: CartDishEntity;
}

export interface GetDishesByUserResponse {
  message: string;
  cart: CartDishEntity[];
  totalQuantity: number;
  totalPayment: number;
}

export interface DeleteOneDishResponse {
  message: string;
  quantity: number;
}

export interface deleteAllDishesResponse extends DeleteOneDishResponse {}


export interface GetDishByDishIdResponse {
  message: string;
  cartItem: CartDishEntity;
}