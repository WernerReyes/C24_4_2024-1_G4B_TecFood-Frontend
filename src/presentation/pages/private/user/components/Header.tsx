import { Avatar, Button, InputSearch } from "@/presentation/components";
import { useAuthStore } from "@/presentation/hooks";
import clsx from "clsx";
import { Badge } from "primereact/badge";
import { Menu } from "primereact/menu";
import { useRef, useState } from "react";
import { HeaderLayout, SidebarLayout } from "../../layout";

const items = [
  {
    label: "Profile",
    items: [
      {
        label: "Settings",
        icon: "pi pi-cog",
      },
      {
        label: "Logout",
        icon: "pi pi-sign-out",
      },
    ],
  },
];

const LINKS_SIDEBAR = [
  { label: "Home", url: "javascript:void(0)" },
  { label: "Men", url: "javascript:void(0)" },
  { label: "Women", url: "javascript:void(0)" },
  { label: "Kids", url: "javascript:void(0)" },
];

export const Header = () => {
  const menuLeft = useRef<Menu>(null);
  const { user } = useAuthStore();
  const [collapseMenu, setCollapseMenu] = useState<string>("hidden");
  const handleToggleOpen = () => setCollapseMenu("");
  const handleToggleClose = () => setCollapseMenu("hidden");

  return (
    <HeaderLayout>
      <SidebarLayout
        collapseMenu={collapseMenu}
        handleToggleClose={handleToggleClose}
        links={LINKS_SIDEBAR}
      />

      <div className="ml-auto flex  gap-y-4">
        <InputSearch
          placeholder="Search something..."
          iconClassName={clsx("hidden cursor-pointer text-primary", "lg:block")}
          className={clsx(
            "hidden w-full rounded-lg border-2 border-primary bg-transparent p-2 text-sm outline-none placeholder:text-primary",
            "lg:block",
          )}
        />

        <div className="flex items-center space-x-6">
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
            label={user.name[0]}
            shape="circle"
            className="bg-primary text-white"
            onClick={(event) => menuLeft.current?.toggle(event)}
            aria-haspopup
          ></Avatar>

          <Menu model={items} popup ref={menuLeft} id="popup_menu_left" />

          <Button unstyled onClick={handleToggleOpen} className="lg:hidden">
            <i className="pi pi-bars text-2xl"></i>
          </Button>
        </div>
      </div>
    </HeaderLayout>
  );
};
