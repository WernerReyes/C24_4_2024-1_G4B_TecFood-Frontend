import { Image } from "@/presentation/components";
import { Card } from "./Card";
import { useDishStore } from "@/presentation/hooks";
import { useEffect } from "react";
import { GetDishesDto, getDishesDtoSchema } from "@/domain/dtos";
import { exceptionDto } from "@/presentation/utilities";

export const Dishes = () => {
  const { dishes, startLoadingDishes } = useDishStore();

  useEffect(() => {
    const getDishesDto = exceptionDto({}, getDishesDtoSchema) as GetDishesDto;
    console.log(dishes);
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
