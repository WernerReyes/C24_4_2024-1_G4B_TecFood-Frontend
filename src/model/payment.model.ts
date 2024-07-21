import { PaymentMethodEnum, PaymentStatusEnum } from "@/domain/entities";
import { orderDishEmptyState, type OrderDishModel } from "./orderDish.model";

export interface PaymentModel {
  id: number;
  amount: number;
  paymentMethod: PaymentMethodEnum;
  status: PaymentStatusEnum;
  orderDish: OrderDishModel;
}

export const paymentEmptyState: PaymentModel = {
  id: 0,
  amount: 0,
  paymentMethod: PaymentMethodEnum.CARD,
  status: PaymentStatusEnum.PENDING,
  orderDish: orderDishEmptyState,
};
