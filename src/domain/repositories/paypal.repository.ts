import { CreatePaymentModel } from "@/model";

export interface PaypalRepository {
  createPayment(orderDishId: number): Promise<CreatePaymentModel>;
}
