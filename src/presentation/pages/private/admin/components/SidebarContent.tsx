import clsx from "clsx";
import { PanelMenu, type MenuItem } from "@/presentation/core/components";
import { PrivateRoutes } from "@/presentation/routes";
import { DishIcon } from "@/presentation/core/icons";
import { RoleEnum } from "@/domain/entities";

const {
  common: { LIST_DISHES },
  admin: { ADD_DISH, OFFER_DISH, CATEGORY },
} = PrivateRoutes;

const ITEMS: MenuItem[] = [
  {
    label: "Dishes",
    icon: <DishIcon className="me-1 pb-1  dark:text-white" />,
    items: [
      {
        label: "Add Dish",
        url: ADD_DISH,
      },
      {
        label: "List Dishes",
        url: LIST_DISHES(RoleEnum.ROLE_ADMIN),
      },
      {
        label: "Offer Dish",
        url: OFFER_DISH,
      },
    ],
  },
  {
    label: "Categories",
    icon: <DishIcon className="me-1 pb-1 dark:text-white" />,
    url: CATEGORY,
  },
];

export const SidebarContent = () => {
  return (
    <PanelMenu
      model={ITEMS.map((item) => ({
        ...item,
        className: colorRoute(item.url!),
        items: item.items?.map((subItem: MenuItem) => ({
          ...subItem,
          className: colorRoute(subItem.url!),
        })),
      }))}
    />
  );
};

const colorRoute = (url: string) => {
  const path = window.location.pathname;
  return clsx({
    "bg-primary/20 dark:bg-primary/20 hover:bg-primary/40 border-none":
      path === url,
  });
};
