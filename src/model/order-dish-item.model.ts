import { DishModel, dishEmptyState } from "./dish.model";
import { OrderDishModel, orderDishEmptyState } from "./order-dish.model";

export interface OrderDishItemModel {
  id: number;
  quantity: number;
  price: number;
  orderDish: OrderDishModel;
  dish: DishModel;
}

export interface GetOrderDishItemByOrderModel {
  message: string;
  orderDishItem: OrderDishItemModel[];
}

export interface OrderDishItemState extends OrderDishItemModel {}

export const orderDishItemEmptyState: OrderDishItemState = {
  id: 0,
  quantity: 0,
  price: 0,
  orderDish: orderDishEmptyState,
  dish: dishEmptyState,
};
