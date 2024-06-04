import { DishModel } from "@/model";
import { Image } from "@/presentation/components";
import {
  useCartStore,
  useDishStore,
  useWindowSize
} from "@/presentation/hooks";
import clsx from "clsx";
import { DishesLayout } from "../../layout";
import { Card } from "../common/Card";

const ROW_PER_PAGE = [5, 10, 15];

export const Dishes = () => {
  const { dishes } = useDishStore();
  const { isExtraLargeDesktop } = useWindowSize();
  const { cart } = useCartStore();

  const handleLoadCartQuantity = (dish: DishModel): number => {
    const cartItem = cart.find((cartItem) => cartItem.dish.id === dish.id);
    return cartItem?.quantity || 0;
  };

  return (
    <DishesLayout
      rowPerPage={ROW_PER_PAGE}
      paginator={dishes.length > 0}
    >
      <section
        className={clsx(
          "grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3",
          dishes.length === 1 && isExtraLargeDesktop ? "h-[28rem]" : "h-full",
        )}
      >
        <Image
          className={clsx(
            "order-1",
            dishes.length ? "sm:col-span-2" : "col-span-3",
          )}
          imageClassName="object-cover w-full h-full"
          src="/user/offert.png"
          alt="dish"
        />

        {dishes.length ? (
          dishes.map((dish) => (
            <Card
              key={dish.id}
              dishId={dish.id}
              imgSrc={dish.img}
              title={dish.name}
              price={dish.price}
              stock={dish.stock}
              quantity={handleLoadCartQuantity(dish)}
            />
          ))
        ) : (
          <div className="order-2 col-span-3 rounded-2xl bg-skeleton py-3 text-center dark:bg-skeleton-dark lg:mx-auto lg:w-3/4">
            <p className="w-full text-xl">No dishes found</p>
          </div>
        )}
      </section>
    </DishesLayout
    >
  );
};
