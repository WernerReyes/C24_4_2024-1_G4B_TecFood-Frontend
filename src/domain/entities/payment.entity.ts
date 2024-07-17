import type { OrderDishEntity } from "./orderDish.entity";

export enum PaymentMethodEnum {
  CARD = "CARD",
  PAYPAL = "PAYPAL",
}

export enum PaymentStatusEnum {
  PENDING = "PENDING",
  FAILED = "FAILED",
  COMPLETED = "COMPLETED",
}

export interface PaymentEntity {
  id: number;
  amount: number;
  paymentMethod: PaymentMethodEnum;
  status: PaymentStatusEnum;
  orderDish: OrderDishEntity;
}