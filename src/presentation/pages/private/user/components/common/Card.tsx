import clsx from "clsx";
import { CardSkeleton, Image, Link, Tooltip } from "@/presentation/components";
import { useCart } from "@/presentation/hooks";
import { PrivateRoutes } from "@/presentation/routes";
import { AddAndRemoveDish, ButtonAddAndRemoveDish } from "../";
import { Heart } from "../../../components";
import { DishState } from "@/model";

const {
  USER,
  user: { DISHES },
} = PrivateRoutes;

type Props = {
  dish: DishState;
  quantity: number;
};

export const Card = ({ dish, quantity }: Props) => {
  const {
    isAddToCart,
    quantityMemory,
    handleAddToCart,
    handleRemoveToCart,
    handleResetCart,
    loaded,
    handleLoaded,
  } = useCart(dish.id, quantity, "card");

  return (
    <>
      {!loaded && <CardSkeleton className="order-3" />}
      <div
        className={clsx(
          loaded ? "block" : "hidden",
          "order-3 overflow-hidden rounded-lg border border-slate-300 p-4 transition-all duration-300 hover:border-primary hover:shadow-xl  dark:border-slate-700 dark:hover:border-primary",
        )}
      >
        <div className="group relative divide-y overflow-hidden rounded-lg">
          <div className="mx-auto mb-4">
            <Tooltip target=".img-dish" mouseTrack mouseTrackTop={10} />
            <Link unstyled to={`${USER}/${DISHES}/${dish.id}`}>
              <Image
                className="img-dish"
                unstyled
                src={dish.img}
                alt={dish.name}
                onLoad={handleLoaded}
                imageClassName="rounded-lg w-full h-52 object-cover transition-all group-hover:scale-105"
                data-pr-tooltip={
                  dish.stock === 0 ? "No stock" : `Stock: ${dish.stock}`
                }
              />
            </Link>
          </div>
          <div className="pt-2 dark:border-slate-700">
            <div className="mb-4 flex items-center justify-between">
              <Link
                unstyled
                to={`${USER}/${DISHES}/${dish.id}`}
                className="text-xl font-semibold"
              >
                {dish.name}
              </Link>
              <Heart />
            </div>
            <span className="mb-4 inline-flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary">
                <i className="pi pi-star-fill text-xs text-white"></i>
              </span>
              <span className="text-default-950 from-inherit text-sm">4.5</span>
            </span>
            <div className="mb-4 flex items-end justify-between">
              <h4 className="text-default-900 text-2xl font-semibold leading-9">
                S/.{dish.price}
              </h4>
              <AddAndRemoveDish
                isAddToCart={isAddToCart}
                handleAddToCart={handleAddToCart}
                quantityMemory={quantityMemory}
                handleRemoveToCart={handleRemoveToCart}
                stock={dish.stock}
              />
            </div>
            <ButtonAddAndRemoveDish
              isAddToCart={isAddToCart}
              quantityMemory={quantityMemory}
              handleAddToCart={handleAddToCart}
              handleResetCart={handleResetCart}
              stock={dish.stock}
            />
          </div>
        </div>
      </div>
    </>
  );
};
