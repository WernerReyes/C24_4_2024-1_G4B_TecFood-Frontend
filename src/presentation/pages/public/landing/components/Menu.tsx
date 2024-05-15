import { Button } from "@/presentation/components";
import { useDishStore, useWindowSize } from "@/presentation/hooks";
import { breakPointsSwiper, responsiveDesign } from "@/presentation/utilities";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Card } from "./Card";

const breakpointsButtons = breakPointsSwiper({
  slidesPerViewSm: 3,
  slidesPerViewMd: 4,
  slidesPerViewLg: 5,
  slidesPerViewXl: 6,
});

const breakpointsMenu = breakPointsSwiper({
  slidesPerViewMd: 2,
  slidesPerViewLg: 4,
  slidesPerViewXl: 4,
});

const SCREEN_WIDTH = responsiveDesign.md;

const buttonLabels = [
  "Ramen",
  "Breakfast",
  "Lunch",
  "Dinner",
  "Maxican",
  "Desserts",
  "Italian",
  "Drinks",
];

type Props = {
  marginContainer: string;
};

export const Menu = ({ marginContainer }: Props) => {
  const { dishes, startLoadingDishes } = useDishStore();
  const { width } = useWindowSize();
  const [selectedButton, setSelectedButton] = useState<string>("Ramen");

  const handleSelectButton = (label: string) => {
    setSelectedButton(label);
  };

  useEffect(() => {
    startLoadingDishes();
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
        breakpoints={breakpointsButtons}
      >
        {buttonLabels.map((label) => (
          <SwiperSlide key={label}>
            <Button
              label={label}
              onClick={() => handleSelectButton(label)}
              className={clsx(
                selectedButton === label
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
          breakpoints={breakpointsMenu}
        >
          {dishes.map((dishOffer) => (
            <SwiperSlide key={dishOffer.id}>
              <Card
                key={dishOffer.id}
                title={dishOffer.name}
                description={dishOffer.description}
                rating={5}
                price={dishOffer.price}
                image={dishOffer.img}
              />
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
          {dishes.map((dishOffer) => (
            <Card
              key={dishOffer.id}
              title={dishOffer.name}
              description={dishOffer.description}
              rating={5}
              price={dishOffer.price}
              image={dishOffer.img}
            />
          ))}
        </div>
      )}
    </section>
  );
};
