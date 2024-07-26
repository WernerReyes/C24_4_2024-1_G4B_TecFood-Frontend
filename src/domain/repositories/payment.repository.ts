import type { PaymentModel } from "@/model";
import type { ApiResponse, ProcessPaymentDto } from "../dtos";

export abstract class PaymentRepository {
    abstract  processPayment(
        processPaymentDto: ProcessPaymentDto,
      ): Promise<ApiResponse<PaymentModel>>;
}