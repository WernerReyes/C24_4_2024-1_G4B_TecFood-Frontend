import { UserEntity } from "./user.entity";

export enum OrderDishStatusEnum {
  PENDING = "PENDING",
  PROCESSED = "PROCESSED",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}

export interface OrderDishEntity {
  id: number;
  invoiceReportUrl: string | null;
  orderDate: Date;
  status: OrderDishStatusEnum;
  total: number;
  user: UserEntity;
}

export interface CreateOrderDishResponse {
  message: string;
  orderDish: OrderDishEntity;
}

export interface UpdateOrderDishStatusResponse {
  message: string;
  status: OrderDishStatusEnum;
}

export interface GetOrderDishesByUserResponse {
  message: string;
  orderDishes: OrderDishEntity[];
  status: OrderDishStatusEnum[];
  currentPage: number;
  total: number;
  limit: number;
  next: string;
  previous: string;
}