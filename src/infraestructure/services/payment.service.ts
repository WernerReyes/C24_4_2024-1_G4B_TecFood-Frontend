import { paymentAdapter } from "@/config/adapters";
import { httpRequest } from "@/config/api";
import type { ApiResponse, ProcessPaymentRequest } from "@/domain/dtos";
import type { PaymentEntity } from "@/domain/entities";
import type { PaymentModel } from "@/model";

interface IPaymentService {
  processPayment(
    processPaymentRequest: ProcessPaymentRequest,
  ): Promise<ApiResponse<PaymentModel>>;
}

export class PaymentService implements IPaymentService {
  private prefix: string;

  constructor() {
    this.prefix = "/payment";
  }

  public async processPayment(processPaymentRequest: ProcessPaymentRequest) {
    try {
      const { data, ...rest } = await httpRequest.post<PaymentEntity>(
        `${this.prefix}/process`,
        processPaymentRequest,
      );

      return { data: paymentAdapter(data), ...rest };
    } catch (error) {
      throw error;
    }
  }
}
