import { OrderDishStatusEnum } from "@/domain/entities";
import { UserModel, userEmptyState } from "./user.model";
import { getStorage } from "@/presentation/utilities";

export interface OrderDishModel {
  id: number;
  date: Date;
  invoiceReportUrl: string | null
  status: OrderDishStatusEnum;
  total: number;
  user: UserModel;
}

export interface CreateOrderDishModel {
  message: string;
  orderDish: OrderDishModel;
}

export interface GetOrderDishesByUserModel {
  message: string;
  orderDishes: OrderDishModel[];
  status: OrderDishStatusEnum[];
  currentPage: number;
  total: number;
  limit: number;
  next: string;
  previous: string;
}

export interface UpdateOrderDishStatusModel {
  message: string;
  status: OrderDishStatusEnum;
}

export interface OrderDishState extends OrderDishModel {}

export type OrderDishFilter = {
  status: { status: OrderDishStatusEnum }[];
};

export const orderDishEmptyState: OrderDishState = {
  id: 0,
  date: "" as any as Date,
  status: OrderDishStatusEnum.PENDING,
  total: 0,
  user: userEmptyState,
  invoiceReportUrl: null
};

export const orderDishFilterEmptyState: OrderDishFilter = getStorage(
  "orderDishFilters",
) || {
  status: [{ status: OrderDishStatusEnum.COMPLETED }],
};
