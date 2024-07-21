import { httpRequest } from "@/config/api";
import type { CompletePaymentResponse, CreatePaymentResponse } from "@/model";

export interface IPaypalService {
  createPayment(orderDishId: number): Promise<CreatePaymentResponse>;
  completePayment(orderId: string): Promise<CompletePaymentResponse>;
}

export class PaypalService implements IPaypalService {
  private readonly prefix: string;
  constructor() {
    this.prefix = "/paypal";
  }

  public async createPayment(orderDishId: number) {
    try {
      const { data } = await httpRequest<CreatePaymentResponse>(
        `${this.prefix}/create-payment`,
        "POST",
        { orderDishId },
      );

      return {
        ...data,
      };
    } catch (error) {
      throw error;
    }
  }

  public async completePayment(orderId: string) {
    try {
      const { data } = await httpRequest<CompletePaymentResponse>(
        `${this.prefix}/capture`,
        "POST",
        { orderId },
      );

      return {
        ...data,
      };
    } catch (error) {
      throw error;
    }
  }
}
