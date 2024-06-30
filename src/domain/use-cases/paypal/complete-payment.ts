import type { PaypalRepository } from "@/domain/repositories";
import type { CompletePaymentModel } from "@/model";

interface CompletePaymentUseCase {
  execute: (orderId: string) => Promise<CompletePaymentModel>;
}

export class CompletePayment implements CompletePaymentUseCase {
  constructor(private readonly repository: PaypalRepository) {}

  async execute(orderId: string): Promise<CompletePaymentModel> {
    return this.repository.completePayment(orderId);
  }
}
