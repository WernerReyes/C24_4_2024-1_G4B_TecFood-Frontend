import { httpRequest } from "@/config/api";
import { CreatePaymentResponse } from "@/domain/entities";
import type { CreatePaymentModel } from "@/model";

export interface IPaypalService {
  createPayment(orderDishId: number): Promise<CreatePaymentModel>;
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
}
