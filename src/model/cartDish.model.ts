import { DishModel, DishState, dishEmptyState } from "./dish.model";
import { UserModel, UserState, userEmptyState } from "./user.model";


export interface CartDishModel {
  id: number;
  quantity: number;
  dish: DishModel;
  user: UserModel;
}

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
