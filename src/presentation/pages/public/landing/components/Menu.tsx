import clsx from "clsx";
import { useEffect, useState } from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { GetDishesRequest } from "@/domain/dtos";
import { Button } from "@/presentation/core/components";
import {
  useDishCategoryStore,
  useDishStore,
  useWindowSize,
} from "@/presentation/hooks";
import { breakPointsSwiper, responsiveDesign } from "@/presentation/utilities";
import { Card } from "./Card";

const BREAK_POINTS_BUTTONS = breakPointsSwiper({
  slidesPerViewSm: 3,
  slidesPerViewMd: 4,
  slidesPerViewLg: 5,
  slidesPerViewXl: 6,
});

const BREAK_POINTS_MENU = breakPointsSwiper({
  slidesPerViewMd: 2,
  slidesPerViewLg: 4,
  slidesPerViewXl: 4,
});

const SCREEN_WIDTH = responsiveDesign.md;

type Props = {
  marginContainer: string;
};

export const Menu = ({ marginContainer }: Props) => {
  const { dishesPaginated, startLoadingDishesPaginated } = useDishStore();
  const { dishCategories, startLoadingDishCategories } = useDishCategoryStore();
  const { width } = useWindowSize();
  const [selectedButton, setSelectedButton] = useState<string>("all");
  const [selectedCategoryId, setSelectedCategoryId] = useState<
    { idCategory: number }[] | null
  >(null);

  const handleSelectButton = (name: string, id: number | null) => {
    setSelectedButton(name);
    setSelectedCategoryId(id ? [{ idCategory: id }] : null);
  };

  useEffect(() => {
    const getDishesRequest = new GetDishesRequest(
      1,
      10,
      selectedCategoryId,
      null,
      null,
    );
    startLoadingDishesPaginated(getDishesRequest);
  }, [selectedCategoryId]);

  useEffect(() => {
    startLoadingDishCategories();
  }, []);

  return (
    <section
      id="our-menu"
      className={clsx(
        "mt-20 text-center text-xs",
        "sm:text-sm",
        marginContainer,
      )}
    >
      <h2 className={clsx("text-2xl font-extrabold", "md:text-3xl")}>
        <span className="text-primary">Menu </span>
        <span className="text-black dark:text-white">That </span>
        <span className="text-secondary">Always </span>
        <span className="text-black dark:text-white">Make You Fall In</span>
        <span className="text-primary"> Love</span>
      </h2>
      <Swiper
        modules={[Navigation]}
        slidesPerView={3}
        className="mt-10"
        breakpoints={BREAK_POINTS_BUTTONS}
      >
        <SwiperSlide key={"all"} className="m-0">
          <Button
            label={"Todo"}
            onClick={() => handleSelectButton("all", null)}
            className={clsx(
              selectedButton === "all"
                ? ""
                : "border-2 border-zinc-400 bg-transparent text-zinc-400",
            )}
          />
        </SwiperSlide>
        {dishCategories.map(({ name, id }) => (
          <SwiperSlide key={id}>
            <Button
              label={name}
              onClick={() => handleSelectButton(name, id)}
              className={clsx(
                selectedButton === name
                  ? ""
                  : "border-2 border-zinc-400 bg-transparent text-zinc-400",
              )}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      {width < SCREEN_WIDTH ? (
        <Swiper
          modules={[Navigation]}
          slidesPerView={1}
          spaceBetween={50}
          className="mt-10"
          breakpoints={BREAK_POINTS_MENU}
        >
          {dishesPaginated.map((dish) => (
            <SwiperSlide key={dish.id}>
              <Card {...dish} key={dish.id} rating={5} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div
          className={clsx(
            "mt-10 grid gap-x-20",
            "ms:grid-cols-2",
            "md:grid-cols-2",
            "lg:grid-cols-3",
            "xl:grid-cols-4",
          )}
        >
          {dishesPaginated.map((dish) => (
            <Card
              key={dish.id}
              {...dish}
              rating={5}
              // key={dish.id}
              // title={dish.name}
              // description={dish.description}
              // rating={5}
              // price={dish.price}
              // image={dish.img}
            />
          ))}
        </div>
      )}
    </section>
  );
};
