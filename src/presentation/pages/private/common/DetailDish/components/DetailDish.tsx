import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import { Button, Chip, Galleria } from "@/presentation/core/components";
import {
  useAuthStore,
  useCart,
  useCartStore,
  useDishStore,
} from "@/presentation/hooks";
import {
  Heart,
  AddAndRemoveDish,
  ButtonAddAndRemoveDish,
} from "../../../components";
import { DetailDishSkeleton } from "./DetailDishSkeleton";
import { PrivateRoutes } from "@/presentation/routes";
import { StatusColor } from "../../../components";
import { ActionsLayout } from "../../../layout";

const {
  admin: { EDIT_DISH },
} = PrivateRoutes;

export const DetailDish = React.memo(() => {
  const navigate = useNavigate();
  const { isAdmin, isUser } = useAuthStore();
  const { cart } = useCartStore();
  const { dish, startUpdatingDishStatus, isLoading } = useDishStore();
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
        <div className="mb-5 h-full rounded-lg border p-5 dark:border-slate-700 lg:mb-0">
          {isAdmin && <StatusColor status={dish.status} />}
          <Galleria
            images={dish.images.map((image) => image.url)}
            onLoad={handleLoaded}
          />
        </div>
        <div className="mt-5 flex h-full flex-col rounded-lg border p-5 dark:border-slate-700  lg:mt-0">
          <div className="flex items-center justify-between">
            <h5 className="text-2xl font-semibold lg:text-3xl">{dish.name}</h5>
            <div className="flex items-end justify-between">
              {dish.discountPrice && (
                <h5 className="text-3xl font-semibold md:text-4xl">
                  S/.{dish.discountPrice}
                </h5>
              )}

              <p
                className={clsx(
                  dish.discountPrice
                    ? "ms-1 text-lg text-gray-400 line-through"
                    : "text-4xl font-semibold",
                )}
              >
                S/.{dish.price}
              </p>
            </div>
          </div>
          <p className="mt-4 text-justify text-sm text-slate-400">
            {dish.description}
          </p>
          <div className="mb-5 flex flex-wrap items-center lg:mb-0">
            {dish.categories.map((category) => (
              <Chip
                image={category.imageUrl}
                key={category.id}
                label={category.name}
                className="me-2 mt-3 border-2 border-skeleton bg-transparent text-xs dark:border-skeleton-dark"
                pt={{
                  image: { className: "h-7 w-7" },
                }}
              />
            ))}
          </div>

          <div className="mb-5 mt-auto flex items-center">
            {isAdmin && (
              <>
                <Button
                  label="Edit"
                  icon="pi pi-pencil"
                  onClick={() => {
                    navigate(EDIT_DISH(dish.id));
                  }}
                  className="relative z-10 !w-full items-center  justify-center rounded-lg bg-primary px-6 py-3 text-center text-sm font-medium text-white shadow-sm transition-all duration-300 hover:bg-primary-dark disabled:bg-primary-lighter disabled:dark:cursor-not-allowed lg:w-auto"
                />
                <ActionsLayout
                  id={dish.id}
                  status={dish.status}
                  startUpdatingStatus={startUpdatingDishStatus}
                  isLoading={isLoading}
                  children
                  positionCheckbox="right"
                  className="ml-2 mt-4"
                />
              </>
            )}
            {isUser && (
              <>
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
              </>
            )}
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
});
