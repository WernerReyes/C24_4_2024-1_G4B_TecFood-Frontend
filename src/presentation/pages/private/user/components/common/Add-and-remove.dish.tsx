import { Button } from "@/presentation/components";
import { useCartStore } from "@/presentation/hooks";
import clsx from "clsx";

const DEFAULT_CLASS_NAME =
  "relative z-10 items-center justify-between rounded-full border border-slate-300 p-1 dark:border-slate-700";

type Props = {
  dishId: number;
  isAddToCart: boolean;
  handleAddToCart: () => void;
  quantityMemory: number;
  setQuantityMemory: (value: number) => void;
  setIsAddToCart: (value: boolean) => void;
  className?: string;
  unstyled?: boolean;
};

export const AddAndRemoveDish = ({
  isAddToCart,
  handleAddToCart,
  quantityMemory,
  setQuantityMemory,
  setIsAddToCart,
  dishId,
  className,
  unstyled,
}: Props) => {
  const { startDeleteOneDish, totalQuantity, isLoading } = useCartStore();

  const handleRemoveToCart = () => {
    startDeleteOneDish(dishId).then(() => {
      setQuantityMemory(quantityMemory - 1);
    });

    if (quantityMemory === 1) {
      setIsAddToCart(false);
    }
  };

  return (
    <section
      className={clsx(
        isAddToCart ? "inline-flex" : "hidden",
        unstyled ? "flex" : DEFAULT_CLASS_NAME,
        className,
      )}
    >
      <Button
        onClick={handleRemoveToCart}
        unstyled
        className="inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-slate-300 text-sm dark:bg-slate-700"
      >
        <i
          className={clsx(
            "pi text-xs",
            quantityMemory > 1 ? "pi-minus" : "pi-trash text-red-500",
          )}
        ></i>
      </Button>
      <p className="min-w-[45px] text-center"> {quantityMemory} </p>
      <Button
        onClick={handleAddToCart}
        disabled={quantityMemory >= 5 || totalQuantity >= 5 || isLoading}
        unstyled
        className="inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-slate-300 text-sm disabled:cursor-not-allowed disabled:bg-slate-300 dark:bg-slate-700 disabled:dark:bg-slate-400"
      >
        +
      </Button>
    </section>
  );
};