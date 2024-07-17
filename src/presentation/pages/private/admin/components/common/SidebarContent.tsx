import clsx from "clsx";
import { PanelMenu, type MenuItem } from "@/presentation/components";
import { PrivateRoutes } from "@/presentation/routes";

const {
  ADMIN,
  admin: { ADD_DISH },
} = PrivateRoutes;

const ITEMS: MenuItem[] = [
  {
    label: "Dishes",
    icon: (
      <i className="me-1 pb-1 dark:text-white">
        <svg
          stroke="currentColor"
          fill="none"
          strokeWidth="2"
          viewBox="0 0 24 24"
          strokeLinecap="round"
          strokeLinejoin="round"
          height="20"
          width="20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 21a9 9 0 0 0 9-9H3a9 9 0 0 0 9 9Z"></path>
          <path d="M7 21h10"></path>
          <path d="M19.5 12 22 6"></path>
        </svg>
      </i>
    ),
    items: [
      {
        label: "Add Dish",
        url: ADMIN + "/" + ADD_DISH,
      },
      {
        label: "List Dishes",
        url: "/admin/home",
      },
    ],
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
    "bg-primary/20 dark:bg-primary/20 hover:bg-primary/40 border-none": path === url,
  });
};
