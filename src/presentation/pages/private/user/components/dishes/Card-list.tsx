import { useEffect, useState } from "react";
import clsx from "clsx";
import { CardSkeleton, Image, Link, Tooltip } from "@/presentation/components";
import { Heart } from "../../../components";
import { AddAndRemoveDish, ButtonAddAndRemoveDish } from "../";
import { DishState } from "@/model";
import { useCartStore, useMessage } from "@/presentation/hooks";
import { TypeMessage } from "@/infraestructure/store";
import { PrivateRoutes } from "@/presentation/routes";

const {
  USER,
  user: { DISHES },
} = PrivateRoutes;

type Props = {
  dish: DishState;
  quantity: number;
};

export const CardList = ({ dish, quantity }: Props) => {
  const { startSetMessages } = useMessage();
  const { startAddOneDish, totalQuantity } = useCartStore();
  const [isAddToCart, setIsAddToCart] = useState<boolean>(false);
  const [quantityMemory, setQuantityMemory] = useState<number>(0);
  const [loaded, setLoaded] = useState(false);

  const handleAddToCart = () => {
    if (quantityMemory > 5 || totalQuantity > 5)
      return startSetMessages(
        ["You can't add more than 5 items"],
        TypeMessage.ERROR,
      );

    startAddOneDish(dish.id).then(() => {
      setQuantityMemory(quantityMemory + 1);
      setIsAddToCart(true);
    });
  };

  const handleLoaded = () => setLoaded(true);

  useEffect(() => {
    if (quantity > 0) {
      setIsAddToCart(true);
      setQuantityMemory(quantity);
    }
  }, [quantity]);

  return (
    <>
      {!loaded && <CardSkeleton className="order-3" />}
      <div
        className={clsx(
          loaded ? "block" : "hidden",
          "rounded-lg border p-4 transition-all duration-300 hover:border-primary dark:border-slate-700",
        )}
      >
        <div className="relative flex flex-col justify-center gap-4 md:flex-row md:items-center">
          <div className="shrink-0">
            <Tooltip target=".img-dish" mouseTrack mouseTrackTop={10} />
            <Link unstyled to={`${USER}/${DISHES}/${dish.id}`}>
              <Image
                className="img-dish cursor-pointer"
                unstyled
                src={dish.img}
                alt={dish.name}
                onLoad={handleLoaded}
                imageClassName="rounded-lg h-52 w-full md:w-80 object-cover transition-all group-hover:scale-105"
                data-pr-tooltip={`Stock: ${dish.stock}`}
              />
            </Link>
          </div>
          <div className="flex flex-grow items-center gap-4">
            <div className="grow">
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-default-800 line-clamp-1 text-2xl font-semibold">
                    {dish.name}
                  </p>
                  <Heart />
                </div>
                <p className="text-default-600 mb-6 line-clamp-2 max-w-2xl text-base">
                  {dish.description}
                </p>
                <div className="mb-6 flex  flex-wrap items-center gap-4 md:flex-nowrap">
                  <ButtonAddAndRemoveDish
                    dishId={dish.id}
                    isAddToCart={isAddToCart}
                    setIsAddToCart={setIsAddToCart}
                    quantityMemory={quantityMemory}
                    setQuantityMemory={setQuantityMemory}
                    handleAddToCart={handleAddToCart}
                  />
                  <AddAndRemoveDish
                    dishId={dish.id}
                    isAddToCart={isAddToCart}
                    setIsAddToCart={setIsAddToCart}
                    handleAddToCart={handleAddToCart}
                    quantityMemory={quantityMemory}
                    setQuantityMemory={setQuantityMemory}
                  />
                </div>
              </div>
              <div className="flex items-center gap-4">
                <h4 className="text-lg font-semibold text-primary sm:text-2xl">
                  S/.{dish.price}
                  {/* <span className="text-default-400 align-baseline text-xl font-medium line-through">
                    $79
                  </span> */}
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
