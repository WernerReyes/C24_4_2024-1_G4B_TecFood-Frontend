import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { PaymentMethodEnum } from "@/domain/entities";
import { useMessageStore, usePaypal } from "@/presentation/hooks";
import { getEnvs } from "@/presentation/utilities";
import { PrivateRoutes } from "@/presentation/routes";
import { useNavigate } from "react-router-dom";

const { VITE_PAYPAL_CLIENT_ID } = getEnvs();

const {
  USER,
  user: { ORDER_HISTORY },
} = PrivateRoutes;

type Props = {
  orderDishId: number;
  handleProcessPayment: (paymentMethod: PaymentMethodEnum) => void;
};

export const PaypalPayment = ({ orderDishId, handleProcessPayment }: Props) => {
  const navigate = useNavigate();
  const { startSetMessages, typeSuccess, typeError } = useMessageStore();
  const { startCreatePaymentByPaypal, startCompletePaymentByPaypal } =
    usePaypal();

  return (
    <PayPalScriptProvider options={{ clientId: VITE_PAYPAL_CLIENT_ID }}>
      <PayPalButtons
        className="mt-5 w-full bg-transparent"
        style={{
          color: "blue",
          label: "pay",
        }}
        createOrder={async () => {
          const payment = await startCreatePaymentByPaypal(orderDishId);
          return payment?.id!;
        }}
        onApprove={async (data: any) => {
          try {
            await Promise.all([
              handleProcessPayment(
                data.paymentSource.toUpperCase() as PaymentMethodEnum,
              ),
              startCompletePaymentByPaypal(data.orderID),
            ]);

            navigate(`${USER}/${ORDER_HISTORY}`);
          } catch (error) {
            startSetMessages(
              ["An error occurred while processing the payment"],
              typeError,
            );
          }
        }}
        onCancel={() => {
          startSetMessages(["Payment was cancelled successfully"], typeSuccess);
        }}
      />
    </PayPalScriptProvider>
  );
};
