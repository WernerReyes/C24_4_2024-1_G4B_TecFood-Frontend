export interface CreatePaymentModel {
    message: string;
    id: string;
  }

export interface CompletePaymentModel extends CreatePaymentModel {}