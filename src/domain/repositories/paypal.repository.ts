import type { CompletePaymentModel, CreatePaymentModel } from "@/model";

export interface PaypalRepository {
  createPayment(orderDishId: number): Promise<CreatePaymentModel>;
  completePayment(orderId: string): Promise<CompletePaymentModel>;
}
