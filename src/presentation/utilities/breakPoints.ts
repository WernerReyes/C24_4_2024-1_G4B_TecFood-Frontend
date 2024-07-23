import { GalleriaResponsiveOptions } from "../core/components";

type Props = {
  slidesPerViewSm?: number;
  slidesPerViewMd?: number;
  slidesPerViewLg?: number;
  slidesPerViewXl?: number;
};

export const breakPointsSwiper = ({
  slidesPerViewSm: sm = 1,
  slidesPerViewMd: md,
  slidesPerViewLg: lg,
  slidesPerViewXl: xl,
}: Props) => {
  return {
    420: {
      slidesPerView: sm,
    },
    640: {
      slidesPerView: md,
    },
    768: {
      slidesPerView: lg,
    },
    1024: {
      slidesPerView: xl,
    },
  };
};

export const breakPointsGallery: GalleriaResponsiveOptions[] = [
  {
    breakpoint: "1024px",
    numVisible: 3,
  },

  {
    breakpoint: "768px",
    numVisible: 3,
  },
  {
    breakpoint: "640px",
    numVisible: 2,
  },
  {
    breakpoint: "420px",
    numVisible: 1,
  },
];
