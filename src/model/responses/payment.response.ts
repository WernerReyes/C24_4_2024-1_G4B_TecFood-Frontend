export interface ProcessPaymentResponse<T> {
  message: string;
  payment: T;
}
