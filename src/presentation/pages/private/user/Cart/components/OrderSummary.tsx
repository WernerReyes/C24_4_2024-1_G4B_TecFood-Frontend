import { MouseEvent } from "react";
import clsx from "clsx";
import { type CartDishModel } from "@/model";
import { Button, ConfirmPopup, confirmPopup } from "@/presentation/core/components";
import { useOrderDishStore } from "@/presentation/hooks";
import { OrderSummaryLayout } from "../../layout";

type Props = {
  cart: CartDishModel[];
  startResetCartDish: () => void;
};

export const OrderSummary = ({ cart, startResetCartDish }: Props) => {
  const { startCreateOrderDish } = useOrderDishStore();

  const handleCalculateTotal = cart
    .reduce((acc, item) => acc + item.dish.price * item.quantity, 0)
    .toFixed(2);

  const handleAccept = async () => {
    await startCreateOrderDish().then(() => {
      startResetCartDish();
    });
  };

  const handleConfirmOrder = async (e: MouseEvent<HTMLButtonElement>) => {
    confirmPopup({
      isDefault: true,
      target: e.currentTarget,
      accept: handleAccept,
    });
  };

  return (
    <OrderSummaryLayout
      total={Number(handleCalculateTotal)}
      subTotal={Number(handleCalculateTotal)}
    >
      <div className="mt-4">
        <ConfirmPopup />
        <Button
          unstyled
          onClick={handleConfirmOrder}
          className={clsx(
            cart.length === 0 && "cursor-not-allowed",
            "w-full rounded-md bg-primary py-2 text-white disabled:bg-primary-lighter",
          )}
          disabled={cart.length === 0}
        >
          Make Order
        </Button>
      </div>
    </OrderSummaryLayout>
  );
};
