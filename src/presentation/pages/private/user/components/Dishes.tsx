import { useEffect } from "react";
import { GetDishesDto } from "@/domain/dtos";
import { DishModel } from "@/model";
import {
  Image,
  Paginator
} from "@/presentation/components";
import { useCartStore, useDishStore, usePaginatorStore } from "@/presentation/hooks";
import { Card } from "./Card";

const ROW_PER_PAGE = [5, 10, 15];

export const Dishes = () => {
  const { dishes, startLoadingDishes } = useDishStore();
  const { currentPage, limit } = usePaginatorStore();
  const { cart, startLoadingDishesByUser  } = useCartStore();

  useEffect(() => {
    const getDishesDto = GetDishesDto.create({
      page: currentPage,
      limit: limit || ROW_PER_PAGE[0],
      idCategory: null,
      search: null,
    });
    startLoadingDishes(getDishesDto);
    
  }, [currentPage, limit]);

  useEffect(() => {
    startLoadingDishesByUser();
  }, []);


  const handleLoadCartQuantity = (dish: DishModel): number => {
    const cartItem = cart.find((cartItem) => cartItem.dish.id === dish.id);
    return cartItem?.quantity || 0;
  };

  return (
    <>
      <div className="grid h-full grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        <Image
          className="order-1 sm:col-span-2"
          imageClassName="object-cover w-full h-full"
          src="/user/offert.png"
          alt="dish"
        />

        {dishes.map((dish) => (
          <Card
            key={dish.id}
            dishId={dish.id}
            imgSrc={dish.img}
            title={dish.name}
            price={dish.price}
            quantity={handleLoadCartQuantity(dish)}
          />
        ))}
      </div>
      <Paginator
        rowsPerPage={ROW_PER_PAGE}
        className="mt-5 flex justify-end bg-transparent"
      />
    </>
  );
};
