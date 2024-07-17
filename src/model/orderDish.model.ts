import { OrderDishStatusEnum } from "@/domain/entities";
import { type UserModel, userEmptyState } from "./user.model";
import { getStorage } from "@/presentation/utilities";

export interface OrderDishModel {
  id: number;
  date: Date;
  invoiceReportUrl: string | null
  status: OrderDishStatusEnum;
  total: number;
  user: UserModel;
}

export interface OrderDishModel extends OrderDishModel {}

export type OrderDishFilter = {
  status: { status: OrderDishStatusEnum }[];
};

export const orderDishEmptyState: OrderDishModel = {
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
