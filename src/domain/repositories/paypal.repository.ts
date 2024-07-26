import type { ApiResponse } from "../dtos";

export abstract class PaypalRepository {
  abstract createPayment(orderDishId: number): Promise<ApiResponse<string>>;
  abstract completePayment(orderId: string): Promise<ApiResponse<string>>;
}
