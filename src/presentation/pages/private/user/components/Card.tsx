import { TypeMessage } from "@/infraestructure/store";
import { Button, CardSkeleton, Image, Link } from "@/presentation/components";
import { useCartStore, useMessage } from "@/presentation/hooks";
import clsx from "clsx";
import { useEffect, useState } from "react";

type Props = {
  className?: string;
  dishId: number;
  imgSrc: string;
  title: string;
  price: number;
  quantity: number;
};

export const Card = ({ dishId, imgSrc, title, price, quantity }: Props) => {
  const { startSetMessages } = useMessage();
  const { startAddOneDish, startDeleteOneDish, startdeleteAllDishes, totalQuantity, isLoading } = useCartStore();
  const [heart, setHeart] = useState<string>("pi pi-heart");
  const [isAddToCart, setIsAddToCart] = useState<boolean>(false);
  const [quantityMemory, setQuantityMemory] = useState<number>(0);
  const [loaded, setLoaded] = useState(false);

  const handleAddToCart = async () => {
    if (quantityMemory > 5 || totalQuantity > 5)
      return startSetMessages(
        ["You can't add more than 5 items"],
        TypeMessage.ERROR,
      );

    await startAddOneDish(dishId);
    setQuantityMemory(quantityMemory + 1);
    setIsAddToCart(true);
  };

  const handleResetCart = async() => {
    await startdeleteAllDishes(dishId);
    setQuantityMemory(0);
    setIsAddToCart(false);
  };

  const handleRemoveToCart = async() => {
    await startDeleteOneDish(dishId);
    setQuantityMemory(quantityMemory - 1);
    if (quantityMemory === 1) {
      setIsAddToCart(false);
    }
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
            <Image
              src={imgSrc}
              alt={title}
              handleLoaded={handleLoaded}
              imageClassName="rounded-lg w-full h-52 object-cover transition-all group-hover:scale-105"
            />
          </div>
          <div className="pt-2 dark:border-slate-700">
            <div className="mb-4 flex items-center justify-between">
              <Link unstyled to="/user" className="text-xl font-semibold">
                {title}
              </Link>
              <Button
                onMouseEnter={() => setHeart("pi pi-heart-fill")}
                onMouseLeave={() => setHeart("pi pi-heart")}
                unstyled
              >
                <i
                  className={clsx(
                    heart,
                    "relative z-10 cursor-pointer text-2xl transition-all hover:text-red-500",
                  )}
                ></i>
              </Button>
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
              <div
                className={clsx(
                  isAddToCart ? "inline-flex" : "hidden",
                  "relative z-10 items-center justify-between rounded-full border border-slate-300 p-1 dark:border-slate-700",
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
              </div>
            </div>
            <Button
              unstyled
              onClick={handleAddToCart}
              disabled={quantityMemory >= 5 || totalQuantity >= 5}
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
          </div>
        </div>
      </div>
    </>
  );
};
