import { useDispatch, useSelector } from "react-redux";
import type { ProcessPaymentDto } from "@/domain/dtos";
import { PaymentRepositoryImpl } from "@/infraestructure/repositories";
import { PaymentService } from "@/infraestructure/services";
import {
  onLoadingPayment,
  onProcessPayment,
  type AppState,
} from "@/infraestructure/store";
import { useMessageStore } from "./useMessageStore";

const paymentService = new PaymentService();
const paymentRepositoryImpl = new PaymentRepositoryImpl(paymentService);

export const usePaymentStore = () => {
  const dispatch = useDispatch();
  const { startSetMessages } = useMessageStore();
  const { isLoading, payment, payments } = useSelector(
    (state: AppState) => state.payment,
  );

  const startProcessPayment = async (processPaymentDto: ProcessPaymentDto) => {
    processPaymentDto.validate();

    dispatch(onLoadingPayment());

    paymentRepositoryImpl
      .processPayment(processPaymentDto)
      .then(({ message, data, status }) => {
        dispatch(onProcessPayment(data));
        startSetMessages([message], status);
      })
      .catch((error) => {
        throw error;
      });
  };

  return {
    //* Atributes
    payment,
    payments,
    isLoading,

    //* Methods
    startProcessPayment,
  };
};
