import { DishModel, DishState, dishEmptyState } from "./dish.model";
import { UserModel, UserState, userEmptyState } from "./user.model";

// <------------------ ADAPTER ------------------>
export interface CartModel {
  id: number;
  quantity: number;
  dish: DishModel;
  user: UserModel;
}

// <------------------ RESPONSE ------------------>
export interface AddOneDishModel {
  message: string;
  cartItem: CartModel;
}
export interface GetDishesByUserModel {
  message: string;
  cart: CartModel[];
  totalQuantity: number;
  totalPayment: number;
}

export interface DeleteOneDishModel {
  message: string;
  quantity: number;
}

export interface DeleteAllDishesModel extends DeleteOneDishModel {}

export interface GetDishByDishIdModel {
  message: string;
  cartItem: CartModel;
}

// <------------------ STATE ------------------>

export interface CartState {
  id: number;
  quantity: number;
  dish: DishState;
  user: UserState;
}

export const cartEmptyState: CartState = {
  id: 0,
  quantity: 0,
  dish: dishEmptyState,
  user: userEmptyState,
};
