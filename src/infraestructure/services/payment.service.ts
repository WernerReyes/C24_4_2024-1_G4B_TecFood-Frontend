import { paymentAdapter } from "@/config/adapters";
import { httpRequest } from "@/config/api";
import type { ProcessPaymentDto } from "@/domain/dtos";
import type { PaymentEntity } from "@/domain/entities";
import type { PaymentModel, ProcessPaymentResponse } from "@/model";

interface IPaymentService {
  processPayment(
    processPaymentDto: ProcessPaymentDto,
  ): Promise<ProcessPaymentResponse<PaymentModel>>;
}

export class PaymentService implements IPaymentService {
  private prefix: string;

  constructor() {
    this.prefix = "/payment";
  }

  public async processPayment(processPaymentDto: ProcessPaymentDto) {
    try {
      const { data } = await httpRequest<ProcessPaymentResponse<PaymentEntity>>(
        `${this.prefix}/process`,
        "POST",
        processPaymentDto,
      );

      return {
        ...data,
        payment: paymentAdapter(data.payment),
      };
    } catch (error) {
      throw error;
    }
  }
}
