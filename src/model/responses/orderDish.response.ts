import type { OrderDishStatusEnum } from "@/domain/entities";

export interface CreateOrderDishResponse<T> {
  message: string;
  orderDish: T;
}

export interface UpdateOrderDishStatusResponse {
  message: string;
  status: OrderDishStatusEnum;
}

export interface GetOrderDishesByUserResponse<T> {
  message: string;
  orderDishes: T[];
  status: OrderDishStatusEnum[];
  currentPage: number;
  total: number;
  limit: number;
  next: string;
  previous: string;
}
