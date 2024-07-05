import type { CompletePaymentResponse, CreatePaymentResponse } from "@/model";

export abstract class PaypalRepository {
  abstract createPayment(orderDishId: number): Promise<CreatePaymentResponse>;
  abstract completePayment(orderId: string): Promise<CompletePaymentResponse>;
}
