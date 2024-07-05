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
