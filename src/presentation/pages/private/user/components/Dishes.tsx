import { GetDishesDto } from "@/domain/dtos";
import { Image } from "@/presentation/components";
import { useDishStore } from "@/presentation/hooks";
import { useEffect } from "react";
import { Card } from "./Card";

export const Dishes = () => {
  const { dishes, startLoadingDishes } = useDishStore();

  useEffect(() => {
    const getDishesDto = GetDishesDto.create({
      page: 1,
      limit: 10,
      idCategory: null,
      search: null,
    });
    startLoadingDishes(getDishesDto);
  }, []);

  return (
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
          imgSrc={dish.img}
          title={dish.name}
          price={dish.price}
        />
      ))}
    </div>
  );
};
