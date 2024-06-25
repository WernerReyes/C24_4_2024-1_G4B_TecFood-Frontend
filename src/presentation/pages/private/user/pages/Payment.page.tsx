import { httpRequest } from "@/config/api";
import { PaymentMethodEnum } from "@/domain/entities";
import {
  RadioButton,
  type RadioButtonChangeEvent,
} from "@/presentation/components";
import {
  useMessage,
  useOrderDishItemStore
} from "@/presentation/hooks";
import { getEnvs } from "@/presentation/utilities";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import clsx from "clsx";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { UserLayout } from "../layout";

const PAYMENT_METHODS = [
  {
    name: "Credit Card",
    icon: "pi pi-credit-card",
    value: PaymentMethodEnum.CREDIT_CARD,
  },
  {
    name: "Debit Card",
    icon: "pi pi-credit-card",
    value: PaymentMethodEnum.DEBIT_CARD,
  },
  {
    name: "Paypal",
    icon: "pi pi-paypal",
    value: PaymentMethodEnum.PAYPAL,
  },
];

const { VITE_PAYPAL_CLIENT_ID } = getEnvs();

const PaymentPage = () => {
  const { orderDishId } = useParams<{ orderDishId: string }>();
  const { startSetMessages, typeSuccess } = useMessage();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodEnum>();

  return (
    <UserLayout>
      <section className="mx-10 mt-10 grid grid-cols-1 gap-x-10 md:mx-20 lg:grid-cols-6">
        <div className="col-span-1 lg:col-span-4">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
            Payment Option
          </h2>
          <div className="card mt-4 flex justify-evenly rounded-lg border-2 border-skeleton py-10 dark:border-skeleton-dark">
            {PAYMENT_METHODS.map((method) => (
              <div className="flex flex-col items-center" key={method.value}>
                <i className={clsx("text-2xl", method.icon)} />
                <label htmlFor="paymentMethod" className="ml-2">
                  {method.name}
                </label>
                <RadioButton
                  inputId="paymentMethod"
                  name="pizza"
                  value={method.value}
                  onChange={(e: RadioButtonChangeEvent) =>
                    setPaymentMethod(e.value)
                  }
                  checked={paymentMethod === method.value}
                />
              </div>
            ))}
          </div>
          <PayPalScriptProvider options={{ clientId: VITE_PAYPAL_CLIENT_ID }}>
            <PayPalButtons
              className="w-full bg-transparent"
              style={{
                color: "blue",
                label: "pay",
              }}
              createOrder={async () => {
                const response = await httpRequest<{ id: string }>(
                  "/paypal/create-payment",
                  "POST",
                  {
                    orderDishId,
                  },
                );
                const data = response.data;
                console.log(data);
                return data.id;
              }}
              onApprove={async (data, actions) => {
                console.log(data);
                const response = await httpRequest<{ message: string }>(
                  "/paypal/capture",
                  "POST",
                  {
                    orderId: data.orderID,
                  },
                );
               console.log(response.data);
              }}
              onCancel={() => {
                startSetMessages(
                  ["Payment was cancelled successfully"],
                  typeSuccess,
                );
              }}
            />
          </PayPalScriptProvider>
        </div>
        <div className="col-span-1 mt-8 lg:col-span-2 lg:mt-0">
          {/* <OrderSummary cart={cart} startResetCartDish={startResetCartDish} /> */}
        </div>
      </section>
    </UserLayout>
  );
};

export default PaymentPage;
