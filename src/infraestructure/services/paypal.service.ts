import { httpRequest } from "@/config/api";
import { CompletePaymentResponse, CreatePaymentResponse } from "@/domain/entities";
import type { CompletePaymentModel, CreatePaymentModel } from "@/model";

export interface IPaypalService {
  createPayment(orderDishId: number): Promise<CreatePaymentModel>;
  completePayment(orderId: string): Promise<CompletePaymentModel>;
}

export class PaypalService implements IPaypalService {
  private readonly prefix: string;
  constructor() {
    this.prefix = "/paypal";
  }

  public async createPayment(orderDishId: number): Promise<CreatePaymentModel> {
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

  public async completePayment(orderId: string): Promise<CompletePaymentModel> {
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
