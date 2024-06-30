export interface CreatePaymentResponse {
  message: string;
  id: string;
}

export interface CompletePaymentResponse extends CreatePaymentResponse {}

