import { useRef, useState } from "react";
import {
  Avatar,
  Badge,
  Button,
  Menu,
  MenuRef
} from "@/presentation/components";
import { useAuthStore, useCartStore } from "@/presentation/hooks";
import { Sidebar } from "../../components";
import { HeaderLayout } from "../../layout";

const ITEMS = [
  {
    label: "Settings",
    icon: "pi pi-cog",
  },
  {
    label: "Logout",
    icon: "pi pi-sign-out",
  },
];

const ULR_BASE = "/user";

const LINKS_SIDEBAR = [
  { label: "Home", url: ULR_BASE + "/home" },
  { label: "Profile", url: ULR_BASE + "/profile" },
  { label: "Women", url: ULR_BASE + "/home2" },
  { label: "Kids", url: ULR_BASE + "/home3" },
  { label: "Accessories", url: ULR_BASE + "/home4" },
];

export const Header = () => {
  const menuLeft = useRef<MenuRef>(null);
  const { user } = useAuthStore();
  const { totalQuantity } = useCartStore();
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
      

        <div className="items-center flex space-x-6">
          <i
            className="pi pi-search text-black dark:text-white cursor-pointer text-xl"
          ></i>
          <i className="pi pi-heart-fill p-overlay-badge text-2xl text-red-600">
            <Badge value="0" className="bg-primary text-white" size="normal" />
          </i>
          <i className="pi pi-shopping-cart text-black dark:text-white p-overlay-badge text-2xl">
            <Badge
              value={totalQuantity}
              className="bg-primary text-white"
              size="normal"
            />
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
          />

          <Button unstyled onClick={handleToggleOpen} className="lg:hidden">
            <i className="pi pi-bars text-2xl text-black dark:text-white"></i>
          </Button>
        </div>
      </div>
    </HeaderLayout>
  );
};
