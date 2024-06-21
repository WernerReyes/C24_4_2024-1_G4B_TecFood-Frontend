import type { OrderDishEntity } from "./order-dish.entity";

export enum PaymentMethodEnum {
  CREDIT_CARD = "CREADIT_CARD",
  DEBIT_CARD = "DEBIT_CARD",
  CASH = "CASH",
}

export enum PaymentStatusEnum {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
}

export interface PaymentEntity {
  paymentId: number;
  amount: number;
  paymentMethod: PaymentMethodEnum;
  status: PaymentStatusEnum;
  orderDish: OrderDishEntity;
}
