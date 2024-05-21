import { useRef, useState } from "react";
import clsx from "clsx";
import {
  Avatar,
  Button,
  InputSearch,
  Menu,
  MenuRef,
  Badge,
} from "@/presentation/components";
import { useAuthStore } from "@/presentation/hooks";
import { Sidebar } from "../../components";
import { HeaderLayout } from "../../layout";

const ITEMS = [
  {
    label: "Settings",
    icon: "pi pi-cog",
    className: "hover:bg-none hover:text-red-500 bg-red-500 dark:hover:bg-red-500",
  },
  {
    label: "Logout",
    icon: "pi pi-sign-out",
    className: "dark:hover:bg-red-500",
  },
];

const ULR_BASE = "/user";

const LINKS_SIDEBAR = [
  { label: "Home", url: ULR_BASE + "/home" },
  { label: "Profile", url: ULR_BASE + "/profile" },
  { label: "Women", url: ULR_BASE + "/home2" },
  { label: "Kids", url: ULR_BASE + "/home3" },
];

export const Header = () => {
  const menuLeft = useRef<MenuRef>(null);
  const { user } = useAuthStore();
  const [collapseMenu, setCollapseMenu] = useState<string>("hidden");
  const handleToggleOpen = () => setCollapseMenu("");
  const handleToggleClose = () => setCollapseMenu("hidden");

  return (
    <HeaderLayout>
      <Sidebar
        collapseMenu={collapseMenu}
        handleToggleClose={handleToggleClose}
        links={LINKS_SIDEBAR}
      />

      <div className="ml-auto flex  gap-y-4">
        <InputSearch
          unstyled
          placeholder="Search something..."
          iconClassName={clsx(
            "hidden cursor-pointer text-primary-dark",
            "lg:block",
          )}
          className={clsx(
            "hidden w-64 rounded-full border-2 border-primary bg-primary-lightest bg-transparent p-2 text-sm outline-none placeholder:text-primary-dark",
            "lg:block",
          )}
        />

        <div className="flex ITEMS-center space-x-6">
          <i
            className={clsx("pi pi-search cursor-pointer text-xl", "lg:hidden")}
          ></i>
          <i className="pi pi-heart-fill p-overlay-badge text-2xl text-red-600">
            <Badge value="0" className="bg-primary" size="normal" />
          </i>
          <i className="pi pi-shopping-cart p-overlay-badge text-2xl">
            <Badge value="0" className="bg-primary" size="normal" />
          </i>

          <Avatar
            image={user.img}
            label={user.name[0].toUpperCase()}
            shape="circle"
            className="bg-primary text-white"
            onClick={(event) => menuLeft.current?.toggle(event)}
            aria-haspopup
          ></Avatar>

          <Menu
            model={ITEMS}
            popup
            ref={menuLeft}
            className="dark:bg-skeleton-dark"
          />

          <Button unstyled onClick={handleToggleOpen} className="lg:hidden">
            <i className="pi pi-bars text-2xl"></i>
          </Button>
        </div>
      </div>
    </HeaderLayout>
  );
};
