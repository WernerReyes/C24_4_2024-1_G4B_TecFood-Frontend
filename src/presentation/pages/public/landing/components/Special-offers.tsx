// import { useEffect } from "react";
// import clsx from "clsx";
// import { Navigation, Pagination, Autoplay } from "swiper/modules";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Card } from "./";
// import { useDishOffer } from "@/presentation/hooks";
// import { breakPointsSwiper } from "@/presentation/utilities";

// const breakpoints = breakPointsSwiper({
//   slidesPerViewMd: 2,
//   slidesPerViewLg: 3,
//   slidesPerViewXl: 4,
// });

// type Props = {
//   marginContainer: string;
// };

// export const SpecialOffers = ({ marginContainer }: Props) => {
  
//   return (
//     <section
//       id="special-offers"
//       className={clsx("mt-20 text-center", marginContainer)}
//     >
//       <h2 className={clsx("text-2xl font-extrabold", "md:text-3xl")}>
//         <span className="text-black dark:text-white">Today</span>
//         <span className="text-primary"> Special</span>
//         <span className="text-black dark:text-white"> Offers</span>
//       </h2>
//       <p
//         className={clsx(
//           "mt-4 text-xs text-black dark:text-slate-200",
//           "sm:text-sm",
//         )}
//       >
//         Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laboriosam
//         neque quo ad impedit explicabo optio dolores, magnam asperiores aut
//         nobis perferendis atque voluptatibus debitis illo. Quasi exercitationem
//         eius provident explicabo?
//       </p>

//       <Swiper
//         modules={[Navigation, Pagination, Autoplay]}
//         spaceBetween={50}
//         slidesPerView={1}
//         navigation
//         pagination={{ clickable: true }}
//         autoplay={{ delay: 3500 }}
//         // className="mt-10 p-96"
//         breakpoints={breakpoints}
//       >
//         {!isLoading &&
//           dishOffers.length &&
//           dishOffers.map((dishOffer) => (
//             <SwiperSlide key={dishOffer.id}>
//               <Card
//                 
//               />
//             </SwiperSlide>
//           ))}
//       </Swiper>
//     </section>
//   );
// };
