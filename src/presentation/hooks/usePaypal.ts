import { CreatePayment } from "@/domain/use-cases";
import { PaypalRepositoryImpl } from "@/infraestructure/repositories";
import { PaypalService } from "@/infraestructure/services";
import { CreatePaymentModel } from "@/model";
import { useState } from "react";

const paypalService = new PaypalService();
const paypalRepositoryImpl = new PaypalRepositoryImpl(paypalService);

export const usePaypal = () => {
  const [payment, setPayment] = useState<CreatePaymentModel>();
  const startCreatePayment = async (orderDishId: number) => {
    new CreatePayment(paypalRepositoryImpl)
      .execute(orderDishId)
      .then((data) => setPayment(data))
      .catch((error) => {
        throw error;
      });
  };

  return {
    //* Atributes
    ...payment,

    //* Functions
    startCreatePayment,
  };
};
