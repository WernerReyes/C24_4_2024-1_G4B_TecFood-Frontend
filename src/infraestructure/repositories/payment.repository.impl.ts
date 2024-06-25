import type { PaymentRepository } from "@/domain/repositories";
import type { PaymentService } from "../services";
import type { ProcessPaymentDto } from "@/domain/dtos";
import type { ProcessPaymentModel } from "@/model";

export class PaymentRepositoryImpl implements PaymentRepository {
  constructor(private readonly service: PaymentService) {}

  public async processPayment(
    processPaymentDto: ProcessPaymentDto,
  ): Promise<ProcessPaymentModel> {
    return await this.service.processPayment(processPaymentDto);
  }
}
