import { type DishModel, dishEmptyState } from "./dish.model";
import { type UserModel, userEmptyState } from "./user.model";

export interface CartDishModel {
  id: number;
  quantity: number;
  dish: DishModel;
  user: UserModel;
}

export const cartEmptyState: CartDishModel = {
  id: 0,
  quantity: 0,
  dish: dishEmptyState,
  user: userEmptyState,
};
