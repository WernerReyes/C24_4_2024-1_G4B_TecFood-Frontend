import { MouseEvent } from "react";
import clsx from "clsx";
import { type CartState } from "@/model";
import { Button, ConfirmPopup, confirmPopup } from "@/presentation/components";
import { useOrderDishStore } from "@/presentation/hooks";

type Props = {
  cart: CartState[];
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
  }

  const hanflerConfirmOrder = async (e: MouseEvent<HTMLButtonElement>) => {
    confirmPopup({
      isDefault: true,
      target: e.currentTarget,
      accept: handleAccept,
    });
  };

  return (
    <div className="rounded-lg border-2 bg-transparent dark:border-slate-700">
      <div className="p-6">
        <h6 className="text-xl font-bold">Order Summary</h6>
        <div className="mt-4">
          <div className="my-2 flex justify-between">
            <p>Subtotal</p>
            <p>S/.{handleCalculateTotal}</p>
          </div>
          <div className="my-2 flex justify-between border-t py-2 dark:border-slate-700">
            <p>Total</p>
            <p>S/.{handleCalculateTotal}</p>
          </div>
          <div className="mt-4">
            <ConfirmPopup />
            <Button
              unstyled
              onClick={hanflerConfirmOrder}
              className={clsx(
                cart.length === 0 && "cursor-not-allowed",
                "w-full rounded-md bg-primary py-2 text-white disabled:bg-primary-lighter",
              )}
              disabled={cart.length === 0}
            >
              Make Order
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
