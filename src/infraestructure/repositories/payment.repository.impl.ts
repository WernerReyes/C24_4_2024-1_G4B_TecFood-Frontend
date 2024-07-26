import type { ProcessPaymentRequest } from "@/domain/dtos";
import type { PaymentRepository } from "@/domain/repositories";
import type { PaymentService } from "../services";

export class PaymentRepositoryImpl implements PaymentRepository {
  constructor(private readonly service: PaymentService) {}

  public async processPayment(
    processPaymentRequest: ProcessPaymentRequest,
  ) {
    return await this.service.processPayment(processPaymentRequest);
  }
}
