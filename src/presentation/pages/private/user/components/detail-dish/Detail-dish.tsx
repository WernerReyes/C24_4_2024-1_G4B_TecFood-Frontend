import { Chip, Image } from "@/presentation/components";
import { useCart, useCartStore, useDishStore } from "@/presentation/hooks";
import clsx from "clsx";
import { useEffect, useState } from "react";
import {
  AddAndRemoveDish,
  ButtonAddAndRemoveDish,
  DetailDishSkeleton,
} from "../";
import { Heart } from "../../../components";

export const DetailDish = () => {
  const { cart } = useCartStore();
  const { dish } = useDishStore();
  const [quantity, setQuantity] = useState<number>(0);
  const {
    handleAddToCart,
    handleRemoveToCart,
    setIsAddToCart,
    isAddToCart,
    loaded,
    handleLoaded,
    handleResetCart,
  } = useCart(dish.id, quantity, "card");

  useEffect(() => {
    const item = cart.find((item) => item.dish.id === dish.id);
    if (item) setQuantity(item.quantity);
    else setQuantity(0);
  }, [cart, dish]);

  useEffect(() => {
    if (quantity > 0) setIsAddToCart(true);
    else setIsAddToCart(false);
  }, [quantity, cart, dish]);

  return (
    <>
      {!loaded && <DetailDishSkeleton />}
      <section
        className={clsx(
          "grid grid-cols-1 lg:grid-cols-2 lg:gap-x-10",
          loaded ? "visible" : "hidden",
        )}
      >
        <div className="group mb-5 h-full lg:mb-0">
          <Image
            src={dish.img}
            alt={dish.name}
            className="h-full"
            onLoad={handleLoaded}
            imageClassName="rounded-lg w-full max-h-80 object-cover transition-all group-hover:scale-105"
          />
        </div>
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between">
            <h5 className="text-2xl font-semibold lg:text-3xl">{dish.name}</h5>
            <div className="flex items-center justify-between">
              <p className="text-3xl">S/.{dish.price}</p>
            </div>
          </div>
          <p className="mt-4 text-justify text-sm text-slate-400">
            {dish.description}
          </p>
          <div className="mb-5 lg:mb-0">
            <Chip
              label={dish.category.name}
              className="mt-3 border-2 border-skeleton bg-transparent text-xs dark:border-skeleton-dark"
            />
          </div>

          <div className="mb-5 mt-auto flex items-center">
            <ButtonAddAndRemoveDish
              className="me-4"
              isAddToCart={isAddToCart}
              quantityMemory={quantity}
              handleResetCart={handleResetCart}
              handleAddToCart={handleAddToCart}
            />
            <AddAndRemoveDish
              className="me-4"
              isAddToCart={isAddToCart}
              handleAddToCart={handleAddToCart}
              quantityMemory={quantity}
              handleRemoveToCart={handleRemoveToCart}
            />
            <Heart iconClassName="text-3xl" />
          </div>
          <p className="flex items-center text-sm text-slate-400">
            <i className="pi pi-box me-2 text-2xl text-primary"></i>
            <b className="me-2 text-primary">{dish.stock}</b> dishes available
          </p>
        </div>
      </section>
    </>
  );
};
