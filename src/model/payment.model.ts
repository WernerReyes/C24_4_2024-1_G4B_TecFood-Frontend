import { PaymentMethodEnum, PaymentStatusEnum } from "@/domain/entities";
import { orderDishEmptyState, type OrderDishModel } from "./order-dish.model";

export interface PaymentModel {
  id: number;
  amount: number;
  paymentMethod: PaymentMethodEnum;
  status: PaymentStatusEnum;
  orderDish: OrderDishModel;
}

export interface ProcessPaymentModel {
  message: string;
  payment: PaymentModel;
}

export interface PaymentState extends PaymentModel {}

export const paymentEmptyState: PaymentState = {
  id: 0,
  amount: 0,
  paymentMethod: PaymentMethodEnum.CREDIT_CARD,
  status: PaymentStatusEnum.PENDING,
  orderDish: orderDishEmptyState,
};
