import type { PaypalRepository } from "@/domain/repositories";
import { PaypalService } from "../services";

export class PaypalRepositoryImpl implements PaypalRepository {
  constructor(private readonly service: PaypalService) {}

  async createPayment(orderDishId: number) {
    return this.service.createPayment(orderDishId);
  }
}