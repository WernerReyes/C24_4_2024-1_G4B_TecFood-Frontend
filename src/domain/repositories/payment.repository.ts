import type { PaymentModel } from "@/model";
import type { ApiResponse, ProcessPaymentRequest } from "../dtos";

export abstract class PaymentRepository {
    abstract  processPayment(
        processPaymentRequest: ProcessPaymentRequest,
      ): Promise<ApiResponse<PaymentModel>>;
}