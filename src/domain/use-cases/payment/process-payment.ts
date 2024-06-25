import type { ProcessPaymentDto } from "@/domain/dtos";
import { PaymentRepository } from "@/domain/repositories";
import type { ProcessPaymentModel } from "@/model";

interface ProcessPaymentUseCase {
  execute(processPaymentDto: ProcessPaymentDto): Promise<ProcessPaymentModel>;
}

export class ProcessPayment implements ProcessPaymentUseCase {
  constructor(private readonly repository: PaymentRepository) {}

  public async execute(
    processPaymentDto: ProcessPaymentDto,
  ): Promise<ProcessPaymentModel> {
    return this.repository.processPayment(processPaymentDto);
  }
}
