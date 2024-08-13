import { z } from "zod";
import { PaymentMethodEnum, PaymentStatusEnum } from "@/domain/entities";
import { generateEmptyState } from "@/presentation/utilities";
import {
  OrderDishModelSchema
} from "./orderDish.model";

const PaymentModelSchema = z.object({
  id: z.number(),
  amount: z.number(),
  paymentMethod: z.nativeEnum(PaymentMethodEnum),
  status: z.nativeEnum(PaymentStatusEnum),
  orderDish: OrderDishModelSchema,
});

export type PaymentModel = z.infer<typeof PaymentModelSchema>;

/* <== ( STRUCTURE ) ==>
export const paymentEmptyState: PaymentModel = {
  id: 0,
  amount: 0,
  paymentMethod: PaymentMethodEnum.CARD,
  status: PaymentStatusEnum.PENDING,
  orderDish: orderDishEmptyState,
};
*/
const paymentDefaults: Partial<PaymentModel> = {
  paymentMethod: PaymentMethodEnum.CARD,
  status: PaymentStatusEnum.PENDING,
};

export const paymentEmptyState = generateEmptyState<PaymentModel>(
  PaymentModelSchema,
  paymentDefaults,
);
