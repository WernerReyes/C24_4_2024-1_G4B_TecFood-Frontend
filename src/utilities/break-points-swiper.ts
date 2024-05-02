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
