import { useState } from "react";
import { Badge, Button, Image, Link, MenuItem } from "@/presentation/components";
import { useCartStore, useThemeStore } from "@/presentation/hooks";
import { PrivateRoutes } from "@/presentation/routes";
import {
  AvatarMenu,
  SidebarPrivate,
  LinksToNavigate,
  HeaderSearch,
} from "../../../components";
import { HeaderLayout } from "../../../layout";


const {
  USER,
  user: { HOME, DISHES, PROFILE, CART, ORDER_HISTORY },
} = PrivateRoutes;

const ITEMS: MenuItem[] = [
  {
    label: "Profile",
    icon: "pi pi-user",
    url: USER + "/" + PROFILE,
  },
  {
    label: "Order History",
    icon: "pi pi-history",
    url: USER + "/" + ORDER_HISTORY,
  },
  {
    label: "Logout",
    icon: "pi pi-sign-out",
  },
];

const LINKS_SIDEBAR = [
  { label: "Home", url: USER + "/" + HOME },
  { label: "Dishes", url: USER + "/" + DISHES },
];

export const Header = () => {
  const { isDark } = useThemeStore();
  const { totalQuantity } = useCartStore();
  const [collapseMenu, setCollapseMenu] = useState<boolean>(false);
  const [visible, setVisible] = useState(false);

  const handleToggleOpen = () => setCollapseMenu(!collapseMenu);
  const handleToggleClose = () => setCollapseMenu(false);

  return (
    <HeaderLayout>
      <Image
          src={isDark ? "/logo-dark.svg" : "/logo.svg"}
          alt="logo"
          width="80"
        />
      <SidebarPrivate
        collapseMenu={collapseMenu}
        handleToggleClose={handleToggleClose}
      >
        <LinksToNavigate links={LINKS_SIDEBAR} />
      </SidebarPrivate>

      <ul className="hidden items-center space-x-6 lg:flex">
        <LinksToNavigate links={LINKS_SIDEBAR} />
      </ul>

      <div className="ml-auto flex  gap-y-4">
        <div className="flex items-center space-x-6">
          <i
            onClick={() => setVisible(true)}
            className="pi pi-search cursor-pointer text-xl text-black dark:text-white"
          ></i>
          <i className="pi pi-heart-fill p-overlay-badge text-2xl text-red-600">
            <Badge value="0" className="bg-primary text-white" size="normal" />
          </i>
          <Link
            unstyled
            className="pi pi-shopping-cart p-overlay-badge text-2xl text-black dark:text-white"
            to={USER + "/" + CART}
          >
            <Badge
              value={totalQuantity}
              className="bg-primary text-white"
              size="normal"
            />
          </Link>

          <AvatarMenu items={ITEMS} />
          <Button unstyled onClick={handleToggleOpen} className="lg:hidden">
            <i className="pi pi-bars text-2xl text-black dark:text-white"></i>
          </Button>
        </div>
      </div>
      <HeaderSearch visible={visible} setVisible={setVisible} />
    </HeaderLayout>
  );
};
