import { useEffect, useState } from "react";
import { useCartStore, useDishStore, useMessage } from "@/presentation/hooks";
import { ButtonAddAndRemoveDish, AddAndRemoveDish, DetailDishSkeleton } from "../";
import { TypeMessage } from "@/infraestructure/store";
import { Chip, Image } from "@/presentation/components";
import clsx from "clsx";

export const DetailDish = () => {
  const { startSetMessages } = useMessage();
  const { cart, totalQuantity, startAddOneDish } = useCartStore();
  const { dish } = useDishStore();
  const [isAddToCart, setIsAddToCart] = useState<boolean>(false);
  const [loaded, setLoaded] = useState(false);
  const [quantity, setQuantity] = useState<number>(0);

  const handleAddToCart = () => {
    if (quantity > 5 || totalQuantity > 5)
      return startSetMessages(
        ["You can't add more than 5 items"],
        TypeMessage.ERROR,
      );

    startAddOneDish(dish.id).then(() => {
      setQuantity(quantity + 1);
      setIsAddToCart(true);
    });
  };

  const handleLoaded = () => setLoaded(true);

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
      <section className={clsx("grid grid-cols-1 lg:grid-cols-2 lg:gap-x-10", 
        loaded ? "visible" : "hidden"
      )}>
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

          <div className="mb-5 mt-auto flex">
            <ButtonAddAndRemoveDish
              className="me-4"
              dishId={dish.id}
              isAddToCart={isAddToCart}
              setIsAddToCart={setIsAddToCart}
              quantityMemory={quantity}
              setQuantityMemory={setQuantity}
              handleAddToCart={handleAddToCart}
            />
            <AddAndRemoveDish
              dishId={dish.id}
              isAddToCart={isAddToCart}
              handleAddToCart={handleAddToCart}
              quantityMemory={quantity}
              setQuantityMemory={setQuantity}
              setIsAddToCart={setIsAddToCart}
            />
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
