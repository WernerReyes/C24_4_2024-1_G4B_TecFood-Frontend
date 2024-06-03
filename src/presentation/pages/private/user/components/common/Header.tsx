import { useState } from "react";
import { Badge, Button, MenuItem } from "@/presentation/components";
import { useCartStore } from "@/presentation/hooks";
import { PrivateRoutes } from "@/presentation/routes";
import { AvatarMenu, Sidebar, LinksToNavigate } from "../../../components";
import { HeaderLayout } from "../../../layout";
import { HeaderSeach } from "./Header-seach";

const ITEMS: MenuItem[] = [
  {
    label: "Settings",
    icon: "pi pi-cog",
  },
  {
    label: "Logout",
    icon: "pi pi-sign-out",
  },
];

const { USER } = PrivateRoutes;

const LINKS_SIDEBAR = [
  { label: "Home", url: USER + "/home" },
  { label: "Dishes", url: USER + "/dishes" },
  { label: "Profile", url: USER + "/profile" },
  { label: "Women", url: USER + "/home2" },
  { label: "Kids", url: USER + "/home3" },
  { label: "Accessories", url: USER + "/home4" },
];

type Props = {
  scrollId: string;
};

export const Header = ({ scrollId }: Props) => {
  const { totalQuantity } = useCartStore();
  const [collapseMenu, setCollapseMenu] = useState<boolean>(false);
  const [visible, setVisible] = useState(false);

  const handleToggleOpen = () => setCollapseMenu(!collapseMenu);
  const handleToggleClose = () => setCollapseMenu(false);

  return (
    <HeaderLayout scrollId={scrollId}>
      <Sidebar
        collapseMenu={collapseMenu}
        handleToggleClose={handleToggleClose}
        links={LINKS_SIDEBAR}
      />
      <ul className="hidden items-center space-x-6 lg:flex">
        <LinksToNavigate links={LINKS_SIDEBAR}  /> 
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
          <i className="pi pi-shopping-cart p-overlay-badge text-2xl text-black dark:text-white">
            <Badge
              value={totalQuantity}
              className="bg-primary text-white"
              size="normal"
            />
          </i>
          <AvatarMenu items={ITEMS} />
          <Button unstyled onClick={handleToggleOpen} className="lg:hidden">
            <i className="pi pi-bars text-2xl text-black dark:text-white"></i>
          </Button>
        </div>
      </div>
      <HeaderSeach visible={visible} setVisible={setVisible} />
    </HeaderLayout>
  );
};
