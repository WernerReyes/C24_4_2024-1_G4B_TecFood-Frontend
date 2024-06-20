import { DishModel } from "@/model";
import { useCartStore, useDishStore } from "@/presentation/hooks";
import { CardList } from "../";
import { DishesLayout } from "../../layout";

const ROW_PER_PAGE = [10, 20, 30];

export const DishesList = () => {
  const { dishes } = useDishStore();
  const { cart } = useCartStore();

  const handleLoadCartQuantity = (dish: DishModel): number => {
    const cartItem = cart.find((cartItem) => cartItem.dish.id === dish.id);
    return cartItem?.quantity || 0;
  };

  return (
    <DishesLayout
      rowPerPage={ROW_PER_PAGE}
      paginators={dishes.length > 0 ? [true, true] : [false, false]}
    >
      <section className="grid grid-cols-1 gap-5">
        {dishes.length ? (
          dishes.map((dish) => (
            <CardList
              key={dish.id}
              dish={dish}
              quantity={handleLoadCartQuantity(dish)}
            />
          ))
        ) : (
          <div className="rounded-2xl bg-skeleton py-3 text-center dark:bg-skeleton-dark lg:mx-auto lg:w-3/4">
            <p className="w-full text-xl">No dishes found</p>
          </div>
        )}
      </section>
    </DishesLayout>
  );
};
