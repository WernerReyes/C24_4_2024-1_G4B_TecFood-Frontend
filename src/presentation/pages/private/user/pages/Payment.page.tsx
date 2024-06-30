import { ProcessPaymentDto } from "@/domain/dtos";
import { PaymentMethodEnum } from "@/domain/entities";
import { usePaymentStore } from "@/presentation/hooks";
import { useParams } from "react-router-dom";
import { OrderDishItems, PaypalPayment } from "../components";
import { UserLayout } from "../layout";

const PaymentPage = () => {
  const { orderDishId } = useParams<{ orderDishId: string }>();
  const { startProcessPayment } = usePaymentStore();
 
  const handleProcessPayment = async (paymentMethod: PaymentMethodEnum) => {
    const processPaymentDto = ProcessPaymentDto.create({
      orderDishId: Number(orderDishId),
      paymentMethod,
    });
    await startProcessPayment(processPaymentDto).catch((error) => {
      throw error;
    });
  };
 
  return (
    <UserLayout>
      <section className="mx-10 mt-10 grid grid-cols-1 gap-x-10 md:mx-20 lg:grid-cols-6">
        <div className="col-span-1 lg:col-span-3">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
            Payment Option
          </h2>
          <PaypalPayment
            orderDishId={Number(orderDishId)}
            handleProcessPayment={handleProcessPayment}
          />
        </div>
        <div className="col-span-1 mt-8 lg:col-span-3 lg:mt-0">
          <OrderDishItems orderDishId={Number(orderDishId)} />
        </div>
      </section>
    </UserLayout>
  );
};

export default PaymentPage;
