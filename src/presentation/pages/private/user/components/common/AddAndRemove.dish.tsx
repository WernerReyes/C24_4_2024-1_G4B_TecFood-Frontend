import clsx from "clsx";
import { Button } from "@/presentation/components";
import { useCartStore } from "@/presentation/hooks";

const DEFAULT_CLASS_NAME =
  "relative z-10 items-center justify-between rounded-full border border-slate-300 p-1 dark:border-slate-700";

type Props = {
  isAddToCart: boolean;
  handleAddToCart: () => void;
  quantityMemory: number;
  handleRemoveToCart: () => void;
  className?: string;
  unstyled?: boolean;
  stock: number;
};

export const AddAndRemoveDish = ({
  isAddToCart,
  handleAddToCart,
  quantityMemory,
  handleRemoveToCart,
  className,
  unstyled,
  stock,
}: Props) => {
  const { totalQuantity, isLoading } = useCartStore();
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
        disabled={quantityMemory <= 0 || isLoading}
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
        disabled={quantityMemory >= 5 || totalQuantity >= 5 || isLoading || stock === 0 || quantityMemory >= stock}
        unstyled
        className="inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-slate-300 text-sm disabled:cursor-not-allowed disabled:bg-slate-300 dark:bg-slate-700 disabled:dark:bg-slate-400"
      >
        +
      </Button>
    </section>
  );
};
