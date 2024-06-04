import { useEffect, useState } from "react";
import clsx from "clsx";
import { TypeMessage } from "@/infraestructure/store";
import {
  CardSkeleton,
  Image,
  Link,
  Tooltip,
} from "@/presentation/components";
import { useCartStore, useMessage } from "@/presentation/hooks";
import { ButtonAddAndRemoveDish, AddAndRemoveDish } from "../";
import { PrivateRoutes } from "@/presentation/routes";
import { Heart } from "../../../components";


const { USER, user: { DISHES } } = PrivateRoutes;

type Props = {
  dishId: number;
  imgSrc: string;
  title: string;
  price: number;
  stock: number;
  quantity: number;
};


export const Card = ({
  dishId,
  imgSrc,
  title,
  price,
  stock,
  quantity,
}: Props) => {
  const { startSetMessages } = useMessage();
  const {
    startAddOneDish,
    totalQuantity,
  } = useCartStore();
  const [isAddToCart, setIsAddToCart] = useState<boolean>(false);
  const [quantityMemory, setQuantityMemory] = useState<number>(0);
  const [loaded, setLoaded] = useState(false);

  const handleAddToCart = () => {
    if (quantityMemory > 5 || totalQuantity > 5)
      return startSetMessages(
        ["You can't add more than 5 items"],
        TypeMessage.ERROR,
      );

    startAddOneDish(dishId).then(() => {
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
          "order-3 overflow-hidden rounded-lg border border-slate-300 p-4 transition-all duration-300 hover:border-primary hover:shadow-xl  dark:border-slate-700 dark:hover:border-primary",
        )}
      >
        <div className="group relative divide-y overflow-hidden rounded-lg">
          <div className="mx-auto mb-4">
            <Tooltip target=".img-dish" mouseTrack mouseTrackTop={10} />
            <Link unstyled to={`${USER}/${DISHES}/${dishId}`}>
            <Image
              className="img-dish"
              unstyled
              src={imgSrc}
              alt={title}
              onLoad={handleLoaded}
              imageClassName="rounded-lg w-full h-52 object-cover transition-all group-hover:scale-105"
              data-pr-tooltip={`Stock: ${stock}`}
            />
            </Link>
          </div>
          <div className="pt-2 dark:border-slate-700">
            <div className="mb-4 flex items-center justify-between">
              <Link unstyled to="/user" className="text-xl font-semibold">
                {title}
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
                S/.{price}
              </h4>
              <AddAndRemoveDish
                dishId={dishId}
                isAddToCart={isAddToCart}
                handleAddToCart={handleAddToCart}
                quantityMemory={quantityMemory}
                setQuantityMemory={setQuantityMemory}
                setIsAddToCart={setIsAddToCart}
              />
            </div>
            <ButtonAddAndRemoveDish
              dishId={dishId}
              isAddToCart={isAddToCart}
              setIsAddToCart={setIsAddToCart}
              quantityMemory={quantityMemory}
              setQuantityMemory={setQuantityMemory}
              handleAddToCart={handleAddToCart}
            />
          </div>
        </div>
      </div>
    </>
  );
};
