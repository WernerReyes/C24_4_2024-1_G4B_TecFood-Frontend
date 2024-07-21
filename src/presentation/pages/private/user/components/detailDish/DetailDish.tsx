import { Chip, Galleria, Image } from "@/presentation/components";
import { useCart, useCartStore, useDishStore } from "@/presentation/hooks";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { Heart } from "../../../components";
import {
  AddAndRemoveDish,
  ButtonAddAndRemoveDish,
  DetailDishSkeleton,
} from "../";
import { DishImageModel } from "@/model";

export const DetailDish = () => {
  const { cart } = useCartStore();
  const { dish, isLoading } = useDishStore();
  const [quantity, setQuantity] = useState<number>(0);
  const [activeIndex, setActiveIndex] = useState(0);
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
        <div className="mb-5 h-full rounded-lg border p-5 dark:border-slate-700 lg:mb-0">
          {!isLoading && dish.images.length && (
          <Galleria
            value={dish.images}
            numVisible={3}
            circular
            item={(image: DishImageModel) => (
              <Image
                src={image.url}
                alt={dish.name}
                preview
                width="100%"
                height="100%"
                zoomSrc={image.url}
                onLoad={handleLoaded}
                className="md:max-h-80 w-full lg:h-64 rounded-lg object-cover transition-all h-full"
                imageClassName="w-full h-full max-h-80 lg:h-64 rounded-t-lg object-cover "
              />
            )}
            thumbnail={(image: DishImageModel) => (
              <Image
                src={image?.url}
                alt={dish.name}
                className="object-cover transition-all"
                imageClassName="h-20 w-24 sm:w-32"
              />
            )}
            activeIndex={activeIndex}
            onItemChange={(e) => setActiveIndex(e.index)}
            showThumbnails={dish.images.length > 1}
            autoPlay
            // fullScreen
            transitionInterval={5000}
            pt={{
              thumbnailContainer: { className: "rounded-b-lg" },
            }}

          />
          )}
        </div>
        <div className="mt-5 flex h-full flex-col rounded-lg border p-5 dark:border-slate-700  lg:mt-0">
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
            {dish.categories.map((category) => (
              <Chip
                key={category.id}
                label={category.name}
                className="me-2 mt-3 border-2 border-skeleton bg-transparent text-xs dark:border-skeleton-dark"
              />
            ))}
          </div>

          <div className="mb-5 mt-auto flex items-center">
            <ButtonAddAndRemoveDish
              className="me-4"
              isAddToCart={isAddToCart}
              quantityMemory={quantity}
              handleResetCart={handleResetCart}
              handleAddToCart={handleAddToCart}
              stock={dish.stock}
            />
            <AddAndRemoveDish
              className="me-4"
              isAddToCart={isAddToCart}
              handleAddToCart={handleAddToCart}
              quantityMemory={quantity}
              handleRemoveToCart={handleRemoveToCart}
              stock={dish.stock}
            />
            <Heart iconClassName="text-3xl" />
          </div>
          <p className="flex items-center text-sm text-slate-400">
            <i
              className={clsx(
                "pi pi-box me-2 text-2xl",
                dish.stock === 0 ? "text-red-500" : "text-primary",
              )}
            ></i>
            {dish.stock === 0 ? (
              <b className="me-2 text-red-500">Out of stock</b>
            ) : (
              <>
                <b className="me-2 text-primary">{dish.stock}</b>
                dishes available
              </>
            )}
          </p>
        </div>
      </section>
    </>
  );
};
