import { CategoryNotificationEnum } from "@/domain/entities/enums";
import { Button, Image, Link } from "@/presentation/core/components";
import { OfferIcon } from "@/presentation/core/icons";
import clsx from "clsx";

type Size = "small" | "medium" | "large";

type Props = {
  title: string;
  details: string;
  imageUrl: string;
  date: string;
  size?: Size;
  link?: string;
  category: CategoryNotificationEnum;
};

export const NotificationCard = ({
  size = "small",
  title,
  details,
  imageUrl,
  date,
  category,
  link = "/",
}: Props) => {
  return (
    <div
      id="toast-notification"
      className={clsx(
        "w-full bg-white p-4 text-gray-900 dark:bg-gray-800 dark:text-gray-300",
        sizeClass(size, [
          "max-w-xs border-b text-sm dark:border-slate-700",
          "text-md max-w-sm",
          "max-w-xl rounded-lg text-lg shadow",
        ]),
      )}
      role="alert"
    >
      <div className="mb-3 flex items-center justify-between">
        <span
          className={clsx(
            "mb-1 rounded-lg px-2 font-semibold text-gray-900 dark:text-white",
            sizeClass(size, ["text-sm", "text-md", "text-2xl"]),
            colorCategoryNotification(category),
          )}
        >
          {categoryNotification(category)}
        </span>
        <Button
          unstyled
          icon="pi pi-times"
          aria-label="Close notification"
          size="small"
          className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-white p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-900 focus:ring-2 focus:ring-gray-300 dark:bg-gray-800 dark:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-white"
          pt={{
            icon: { className: "ml-1" },
          }}
        />
      </div>
      <div className="flex items-center">
        <div className="relative inline-block shrink-0">
          <Image
            imageClassName={clsx(
              "rounded-full object-cover",
              sizeClass(size, ["h-12 w-12", "h-16 w-16", "h-20 w-20"]),
            )}
            src={imageUrl}
            alt="Jese Leos image"
          />
          <span
            className={clsx(
              "absolute bottom-0 right-0 inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary",
              colorCategoryNotification(category),
            )}
          >
            <OfferIcon
              className="text-white"
              iconProps={{
                width: 16,
                height: 20,
              }}
            />
          </span>
        </div>
        <div>
          <div className="ms-3 text-sm">
            <div
              className={clsx(
                "font-semibold text-gray-900 dark:text-white",
                sizeClass(size, ["text-md", "text-lg", "text-xl"]),
              )}
            >
              {title}
            </div>
          </div>

          <div className="ms-3 text-sm">
            <div
              className={clsx(
                "line-clamp-3 font-light",
                sizeClass(size, ["text-sm", "text-md", "text-lg"]),
              )}
            >
              <Link
                to={link}
                className="font-light hover:underline dark:text-white"
              >
                {details}
              </Link>
            </div>
            <span
              className={clsx(
                "font-medium text-primary",
                sizeClass(size, ["text-xs", "text-sm", "text-md"]),
              )}
            >
              {date}
            </span>
          </div>
        </div>
        {/*  */}
      </div>
    </div>
  );
};

const categoryNotification = (category: CategoryNotificationEnum) => {
  return {
    [CategoryNotificationEnum.OFFER_DISH]: "Offer dish",
  }[category];
};

const colorCategoryNotification = (category: CategoryNotificationEnum) => {
  return {
    [CategoryNotificationEnum.OFFER_DISH]: "bg-red-500",
  }[category];
};

const sizeClass = (
  size: Size,
  [small, medium, large]: [small: string, medium: string, large: string],
) => {
  return { small, medium, large }[size];
};
