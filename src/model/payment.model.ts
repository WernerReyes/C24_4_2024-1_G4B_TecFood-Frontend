import type { PaymentMethodEnum, PaymentStatusEnum } from "@/domain/entities";
import type { OrderDishModel } from "./order-dish.model";

export interface PaymentModel {
    paymentId: number;
    amount: number;
    paymentMethod: PaymentMethodEnum;
    status: PaymentStatusEnum;
    orderDish: OrderDishModel
  }
  