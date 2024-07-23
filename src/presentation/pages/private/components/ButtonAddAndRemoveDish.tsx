import { Button } from "@/presentation/core/components";
import { useCartStore } from "@/presentation/hooks";
import clsx from "clsx";

type Props = {
  isAddToCart: boolean;
  quantityMemory: number;
  handleAddToCart: () => void;
  handleResetCart: () => void;
  className?: string;
  stock: number;
};

export const ButtonAddAndRemoveDish = ({
  isAddToCart,
  quantityMemory,
  handleResetCart,
  handleAddToCart,
  className,
  stock,
}: Props) => {
  const { totalQuantity } = useCartStore();

  return (
    <section className={className}>
      <Button
        unstyled
        onClick={handleAddToCart}
        disabled={quantityMemory >= 5 || totalQuantity >= 5 || stock === 0 || quantityMemory >= stock}
        className={clsx(
          isAddToCart ? "hidden" : "inline-flex",
          "relative z-10 !w-full items-center  justify-center rounded-lg bg-primary px-6 py-3 text-center text-sm font-medium text-white shadow-sm transition-all duration-300 hover:bg-primary-dark disabled:bg-primary-lighter disabled:dark:cursor-not-allowed lg:w-auto",
        )}
      >
        <i className="pi pi-shopping-cart me-2 text-lg"></i>
        Add to Cart
      </Button>
      <Button
        onClick={handleResetCart}
        unstyled
        className={clsx(
          isAddToCart ? "inline-flex" : "hidden",
          "relative z-10 inline-flex !w-full items-center justify-center  rounded-lg bg-primary-darker/20 px-6 py-3 text-center text-sm font-medium text-primary shadow-sm transition-all duration-300 hover:bg-primary-dark hover:text-white lg:w-auto",
        )}
      >
        <i className="pi pi-trash me-2 text-lg"></i>
        Remove to Cart
      </Button>
    </section>
  );
};
