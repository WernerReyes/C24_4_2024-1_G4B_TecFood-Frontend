import { PaypalRepositoryImpl } from "@/infraestructure/repositories";
import { PaypalService } from "@/infraestructure/services";

const paypalService = new PaypalService();
const paypalRepositoryImpl = new PaypalRepositoryImpl(paypalService);

export const usePaypal = () => {
  const startCreatePaymentByPaypal = async (orderDishId: number) => {
    try {
      const payment = await paypalRepositoryImpl.createPayment(orderDishId);
      return payment;
    } catch (error) {
      throw error;
    }
  };

  const startCompletePaymentByPaypal = async (orderId: string) => {
    try {
      const payment = await paypalRepositoryImpl.completePayment(orderId);
      return payment;
    } catch (error) {
      throw error;
    }
  };

  return {
    //* Functions
    startCreatePaymentByPaypal,
    startCompletePaymentByPaypal,
  };
};
