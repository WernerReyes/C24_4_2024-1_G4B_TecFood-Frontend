import { paymentAdapter } from "@/config/adapters";
import { httpRequest } from "@/config/api";
import type { ProcessPaymentDto } from "@/domain/dtos";
import type { ProcessPaymentResponse } from "@/domain/entities";
import type { ProcessPaymentModel } from "@/model";

interface IPaymentService {
  processPayment(
    processPaymentDto: ProcessPaymentDto,
  ): Promise<ProcessPaymentModel>;
}

export class PaymentService implements IPaymentService {
  private prefix: string;
  
  constructor() {
    this.prefix = "/payment";
  }

  public async processPayment(
    processPaymentDto: ProcessPaymentDto,
  ): Promise<ProcessPaymentModel> {
    try {
      const { data } = await httpRequest<ProcessPaymentResponse>(
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
