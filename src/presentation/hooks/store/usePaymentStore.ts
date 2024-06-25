import { ProcessPaymentDto } from "@/domain/dtos";
import { PaymentRepositoryImpl } from "@/infraestructure/repositories";
import { PaymentService } from "@/infraestructure/services";
import {
  onLoadingPayment,
  onProcessPayment,
  type AppState,
} from "@/infraestructure/store";
import { useDispatch, useSelector } from "react-redux";
import { useMessage } from "../useMessage";
import { ProcessPayment } from "../../../domain/use-cases";

const paymentService = new PaymentService();
const paymentRepositoryImpl = new PaymentRepositoryImpl(paymentService);

export const usePaymentStore = () => {
  const dispatch = useDispatch();
  const { startSetMessages, typeError, typeSuccess } = useMessage();
  const { isLoading, payment, payments } = useSelector(
    (state: AppState) => state.payment,
  );

  const startProcessPayment = async (
    processPaymentDto: [ProcessPaymentDto?, string[]?],
  ) => {
    dispatch(onLoadingPayment());
    const [processPaymentDtoValidated, errors] = processPaymentDto;
    if (errors) return startSetMessages(errors, typeError);

    await new ProcessPayment(paymentRepositoryImpl)
      .execute(processPaymentDtoValidated!)
      .then(({ message, payment }) => {
        dispatch(onProcessPayment(payment));
        startSetMessages([message], typeSuccess);
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
