import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { Image } from "./Image";

type Props = {
  images: string[];
  onLoad: () => void;
};

export const Galleria = ({ images, onLoad }: Props) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  return (
    <div>
      <Swiper
        loop={true}
        spaceBetween={10}
        navigation={true}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        modules={[FreeMode, Navigation, Thumbs]}
        
      >
        {images.map((image, index) => (
          <SwiperSlide
         
           key={index}>
            <Image
              src={image}
              onLoad={onLoad}
              imageClassName="w-full rounded-lg object-cover transition-all max-h-80 h-72"
            />
          </SwiperSlide>
        ))}
      </Swiper>
      {images.length > 1 && (
        <Swiper
          onSwiper={setThumbsSwiper}
          loop={true}
          spaceBetween={10}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper"
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <Image
                src={image}
                onLoad={onLoad}
                imageClassName="mt-5 w-full cursor-pointer h-20 "
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};
