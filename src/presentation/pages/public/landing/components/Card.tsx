import clsx from "clsx";
import { useAuthStore, useThemeStore } from "@/presentation/hooks";
import {
  Button,
  Image,
  Avatar,
  AvatarGroup,
  Card as CardComponent,
} from "@/presentation/components";
import {
  formatNumber,
  getRandomValueFromArray,
} from "@/presentation/utilities";
import type { DishImageState, DishModel } from "@/model";
import { useNavigate } from "react-router-dom";
import { PrivateRoutes } from "@/presentation/routes";

const bgCardDark =
  "linear-gradient(to bottom, #322e2e, #3e3535, #493d3d, #564444, #624c4c)";

const bgCardLight =
  "linear-gradient(to bottom, #ecfaff, #e4f8ff, #dcf5ff, #d3f3ff, #cbf0ff)";

interface Props extends DishModel {
  priceOffer?: number;
  rating: number;
}

const {
  user: { DISHES },
  USER,
} = PrivateRoutes;

export const Card = ({
  name,
  id,
  description,
  rating,
  images,
  price,
  priceOffer,
}: Props) => {
  const { isDark } = useThemeStore();
  const { isAuthenticate } = useAuthStore();
  const navigate = useNavigate();
  const ratingFormat = formatNumber(rating);

  const hangleNavigateToDetail = () => {
    if (!isAuthenticate) return navigate(USER);

    navigate(`${USER}/${DISHES}/${id}`);
  };

  return (
    <div className="mb-20 mt-40">
      <CardComponent
        footer={() => footer(hangleNavigateToDetail)}
        header={header(images, price, priceOffer)}
        className="md:w-25rem h-[22rem] w-full md:h-96"
        style={{
          backgroundImage: clsx(isDark ? bgCardDark : bgCardLight),
        }}
        pt={{
          root: { className: "rounded-3xl" },
          header: { className: clsx("h-24", "sm:h-12", "md:h-16", "xl:h-12") },
          content: { className: clsx("h-[14.8rem]", "md:h-[18.5rem]") },
        }}
      >
        <div
          className={clsx(
            "flex items-center justify-center",
            "md:flex-col",
            "xl:mt-5 xl:flex-row",
          )}
        >
          <AvatarGroup>
            <Avatar
              className={clsx("border-2 dark:border-black", "md:h-10 md:w-10")}
              image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png"
              size="normal"
              shape="circle"
            />
            <Avatar
              className={clsx("border-2 dark:border-black", "md:h-10 md:w-10")}
              image="https://primefaces.org/cdn/primereact/images/avatar/asiyajavayant.png"
              size="normal"
              shape="circle"
            />
            <Avatar
              className={clsx("border-2 dark:border-black", "md:h-10 md:w-10")}
              image="https://primefaces.org/cdn/primereact/images/avatar/onyamalimba.png"
              size="normal"
              shape="circle"
            />
            <Avatar
              className={clsx("border-2 dark:border-black", "md:h-10 md:w-10")}
              image="https://primefaces.org/cdn/primereact/images/avatar/ionibowcher.png"
              size="normal"
              shape="circle"
            />
            <Avatar
              className={clsx("border-2 dark:border-black", "md:h-10 md:w-10")}
              image="https://primefaces.org/cdn/primereact/images/avatar/xuxuefeng.png"
              size="normal"
              shape="circle"
            />
          </AvatarGroup>
          <span
            className={clsx(
              "pi pi-star-fill ml-5 text-2xl text-yellow-500",
              "lg:mt-3 lg:text-xl",
            )}
          >
            <p className="mx-3 inline text-black dark:text-white">
              {ratingFormat}
            </p>
          </span>
        </div>
        <div className="mt-5 text-center">
          <h3 className="text-xl font-bold leading-none text-primary">
            {name}
          </h3>
          <p
            className={clsx(
              "mt-3 line-clamp-5 text-xs font-light text-black dark:text-slate-200",
              "sm:text-sm",
              "xl:line-clamp-6",
            )}
          >
            {description}
          </p>
        </div>
      </CardComponent>
    </div>
  );
};

const header = (
  images: DishImageState[],
  prince: number,
  priceOffer?: number,
) => (
  <div
    className={clsx(
      "bg-trasparent relative bottom-32 mx-auto h-60 w-60 rounded-full border-t-8 border-primary-lighter p-2  dark:border-[#bf7c44]",
      "sm:bottom-32 sm:w-48",
      "md:bottom-28 md:w-48",
    )}
  >
    <Image
      alt="Card"
      src={getRandomValueFromArray(images).url}
      className="w-full text-black dark:text-white"
      preview
      pt={{
        image: {
          className: clsx("rounded-full h-[227px]  object-cover", "sm:h-44"),
        },
      }}
    />
    <p
      className={clsx(
        "absolute bottom-[-8px] right-0 flex h-16 w-16 items-center justify-center rounded-full border-4 bg-[#FDCE77] dark:border-black",
        priceOffer && "flex-col",
        "sm:bottom-10 sm:right-[-5px]",
        "md:right-[20px]",
        "slgbottom-10 lg:gright-[-5px]",
      )}
    >
      {priceOffer && (
        <strong className={clsx("text-lg text-red-500")}>
          S/.{priceOffer}
        </strong>
      )}
      <strong
        className={clsx(
          priceOffer
            ? "text-xs text-black/25 line-through dark:text-black/25"
            : "text-sm text-white dark:text-black",
        )}
      >
        S/.{prince}
      </strong>
    </p>
  </div>
);

const footer = (hangleNavigateToDetail: () => void) => (
  <div className="relative">
    <Button
      onClick={hangleNavigateToDetail}
      label="Order Now"
      className={clsx(
        "absolute bottom-0 w-64 text-white dark:text-black",
        "sm:bottom-[-2.78rem] sm:w-48",
        "md:bottom-0 md:w-40",
        "xl:bottom-[-15px]",
      )}
    />
  </div>
);
