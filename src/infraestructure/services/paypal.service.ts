import { httpRequest } from "@/config/api";
import type { ApiResponse } from "@/domain/dtos";
export interface IPaypalService {
  createPayment(orderDishId: number): Promise<ApiResponse<string>>;
  completePayment(orderId: string): Promise<ApiResponse<string>>;
}

export class PaypalService implements IPaypalService {
  private readonly prefix: string;
  constructor() {
    this.prefix = "/paypal";
  }

  public async createPayment(orderDishId: number) {
    try {
      return await httpRequest.post<string>(`${this.prefix}/create-payment`, {
        orderDishId,
      });
    } catch (error) {
      throw error;
    }
  }

  public async completePayment(orderId: string) {
    try {
      return await httpRequest.post<string>(`${this.prefix}/capture`, {
        orderId,
      });
    } catch (error) {
      throw error;
    }
  }
}
