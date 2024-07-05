import type { PaypalRepository } from "@/domain/repositories";
import type { PaypalService } from "../services";

export class PaypalRepositoryImpl implements PaypalRepository {
  constructor(private readonly service: PaypalService) {}

  async createPayment(orderDishId: number) {
    return this.service.createPayment(orderDishId);
  }

  async completePayment(orderId: string) {
    return this.service.completePayment(orderId);
  }
}
