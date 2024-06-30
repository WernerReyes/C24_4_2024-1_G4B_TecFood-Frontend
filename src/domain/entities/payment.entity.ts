import type { OrderDishEntity } from "./order-dish.entity";

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
  paymentId: number;
  amount: number;
  paymentMethod: PaymentMethodEnum;
  status: PaymentStatusEnum;
  orderDish: OrderDishEntity;
}

export interface ProcessPaymentResponse {
  message: string;
  payment: PaymentEntity;
}
