import { GetDishesWithoutSelectedDishRequest } from "@/domain/dtos";
import { DishModel } from "@/model";
import { useCartStore, useDishStore } from "@/presentation/hooks";
import { breakPointsSwiper } from "@/presentation/utilities";
import { useEffect } from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Card } from "../../../components";


const QUANTITY_EXTRA_DISHES = 4;

const BREAK_POINTS_MENU = breakPointsSwiper({
  slidesPerViewMd: 2,
  slidesPerViewLg: 3,
  slidesPerViewXl: 4,
});

export const MoreOptions = () => {
  const { cart } = useCartStore();
  const {
    dish,
    dishesWithoutSelectedDish,
    startLoadingDishesWithoutSelectedDish,
  } = useDishStore();

  const handleLoadCartQuantity = (dish: DishModel): number => {
    const cartItem = cart.find((cartItem) => cartItem.dish.id === dish.id);
    return cartItem?.quantity || 0;
  };

  useEffect(() => {
    const getDishesWithoutSelectedDishRequest = new GetDishesWithoutSelectedDishRequest(
      dish.id,
      QUANTITY_EXTRA_DISHES,
    );

    startLoadingDishesWithoutSelectedDish(getDishesWithoutSelectedDishRequest);
  }, [dish]);

  return (
    <Swiper
      modules={[Navigation]}
      slidesPerView={1}
      spaceBetween={20}
      className="mt-10 px-10"
      navigation
      breakpoints={BREAK_POINTS_MENU}
    >
      {dishesWithoutSelectedDish.map((dish) => (
        <SwiperSlide key={dish.id}>
          <Card
            key={dish.id}
            dish={dish}
            quantity={handleLoadCartQuantity(dish)}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
