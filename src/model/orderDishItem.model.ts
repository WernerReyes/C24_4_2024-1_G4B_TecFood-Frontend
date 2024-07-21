import { type DishModel, dishEmptyState } from "./dish.model";
import { type OrderDishModel, orderDishEmptyState } from "./orderDish.model";

export interface OrderDishItemModel {
  id: number;
  quantity: number;
  price: number;
  orderDish: OrderDishModel;
  dish: DishModel;
}

export const orderDishItemEmptyState: OrderDishItemModel = {
  id: 0,
  quantity: 0,
  price: 0,
  orderDish: orderDishEmptyState,
  dish: dishEmptyState,
};
