import type { PaymentEntity } from "@/domain/entities";
import type { PaymentModel } from "@/model";
import { orderDishAdapter } from "./orderDish.adapter";

export const paymentAdapter = (paymentEntity: PaymentEntity): PaymentModel => {
  return {
    id: paymentEntity.id,
    amount: paymentEntity.amount,
    paymentMethod: paymentEntity.paymentMethod,
    status: paymentEntity.status,
    orderDish: orderDishAdapter(paymentEntity.orderDish),
  };
};
