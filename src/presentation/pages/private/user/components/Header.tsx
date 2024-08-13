import { useState } from "react";
import {
  Badge,
  Button,
  Image,
  Link,
  MenuItem,
} from "@/presentation/core/components";
import { useCartStore, useThemeStore } from "@/presentation/hooks";
import { PrivateRoutes } from "@/presentation/routes";
import {
  AvatarMenu,
  HeaderSearch,
  LinksToNavigate,
  SidebarPrivate,
} from "../../components";
import { HeaderLayout } from "../../layout";
import { NotificationPreview } from "./NotificationPreview";
import { RoleEnum } from "@/domain/entities";

const {
  common: { PROFILE, HOME, LIST_DISHES },
  user: { CART, ORDER_HISTORY },
} = PrivateRoutes;

const ITEMS: MenuItem[] = [
  {
    label: "Profile",
    icon: "pi pi-user",
    url: PROFILE(RoleEnum.ROLE_USER),
  },
  {
    label: "Order History",
    icon: "pi pi-history",
    url: ORDER_HISTORY,
  },
  {
    label: "Logout",
    icon: "pi pi-sign-out",
  },
];

const LINKS_SIDEBAR = [
  { label: "Home", url: HOME(RoleEnum.ROLE_USER) },
  { label: "Dishes", url: LIST_DISHES(RoleEnum.ROLE_USER) },
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
            to={CART}
          >
            <Badge
              value={totalQuantity}
              className="bg-primary text-white"
              size="normal"
            />
          </Link>

          <NotificationPreview />

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
