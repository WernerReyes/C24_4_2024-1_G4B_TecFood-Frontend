import { useEffect, useState } from 'react'
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useCartStore, useDishStore } from '@/presentation/hooks';
import { breakPointsSwiper } from '@/presentation/utilities';
import { DishState } from '@/model';
import { Card } from '../common/Card';

const QUANTITY_EXTRA_DISHES = 4;

const BREAK_POINTS_MENU = breakPointsSwiper({
  slidesPerViewMd: 2,
  slidesPerViewLg: 3,
  slidesPerViewXl: 4,
});


export const MoreOptions = () => {
    const { cart } = useCartStore();
  const { dish, dishesToSearch } = useDishStore();
  const [dishesLessCurrentItem, setDishesLessCurrentItem] = useState<
    DishState[]
  >([]);

    const handleLoadCartQuantity = (dish: DishState): number => {
        const cartItem = cart.find((cartItem) => cartItem.dish.id === dish.id);
        return cartItem?.quantity || 0;
    };

    useEffect(() => {
        setDishesLessCurrentItem(
            dishesToSearch
                .filter((d) => d.id !== dish.id)
                .slice(0, QUANTITY_EXTRA_DISHES),
        );
    }, [dishesToSearch, dish]);
  return (
    <Swiper
            modules={[Navigation]}
            slidesPerView={1}
            spaceBetween={20}
            className="mt-10 px-10"
            navigation
            breakpoints={BREAK_POINTS_MENU}
          >
          {dishesLessCurrentItem.map((dish) => (
            <SwiperSlide key={dish.id}>
            <Card
              key={dish.id}
              imgSrc={dish.img}
              title={dish.name}
              price={dish.price}
              stock={dish.stock}
              quantity={handleLoadCartQuantity(dish)}
              dishId={dish.id}
            />
            </SwiperSlide>
          ))}
          </Swiper>
  )
}
