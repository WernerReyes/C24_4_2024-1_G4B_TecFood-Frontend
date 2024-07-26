import { paymentAdapter } from "@/config/adapters";
import { httpRequest } from "@/config/api";
import type { ApiResponse, ProcessPaymentDto } from "@/domain/dtos";
import type { PaymentEntity } from "@/domain/entities";
import type { PaymentModel } from "@/model";

interface IPaymentService {
  processPayment(
    processPaymentDto: ProcessPaymentDto,
  ): Promise<ApiResponse<PaymentModel>>;
}

export class PaymentService implements IPaymentService {
  private prefix: string;

  constructor() {
    this.prefix = "/payment";
  }

  public async processPayment(processPaymentDto: ProcessPaymentDto) {
    try {
      const { data, ...rest } = await httpRequest<PaymentEntity>(
        `${this.prefix}/process`,
        "POST",
        processPaymentDto,
      );

      return { data: paymentAdapter(data), ...rest };
    } catch (error) {
      throw error;
    }
  }
}
