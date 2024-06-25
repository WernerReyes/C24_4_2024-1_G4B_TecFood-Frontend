import type { PaypalRepository } from "@/domain/repositories";
import type { CreatePaymentModel } from "@/model";

interface CreatePaymentUseCase {
  execute: (orderDishId: number) => Promise<CreatePaymentModel>;
}

export class CreatePayment implements CreatePaymentUseCase {
  constructor(private readonly repository: PaypalRepository) {}

  async execute(orderDishId: number): Promise<CreatePaymentModel> {
    return this.repository.createPayment(orderDishId);
  }
}
