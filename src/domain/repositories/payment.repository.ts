import type { PaymentModel, ProcessPaymentResponse } from "@/model";
import type { ProcessPaymentDto } from "../dtos";

export abstract class PaymentRepository {
    abstract  processPayment(
        processPaymentDto: ProcessPaymentDto,
      ): Promise<ProcessPaymentResponse<PaymentModel>>;
}