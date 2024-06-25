import type { ProcessPaymentModel } from "@/model";
import type { ProcessPaymentDto } from "../dtos";

export interface PaymentRepository {
    processPayment(processPaymentDto: ProcessPaymentDto): Promise<ProcessPaymentModel>;
}