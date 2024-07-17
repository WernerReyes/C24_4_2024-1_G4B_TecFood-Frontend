import { Button, MenuItem } from "@/presentation/components";
import { PrivateRoutes } from "@/presentation/routes";
import { useState } from "react";
import { AvatarMenu, SidebarPrivate, HeaderSearch } from "../../../components";
import { HeaderLayout } from "../../../layout";
import { SidebarContent } from "./SidebarContent";

const {
  ADMIN,
  admin: { PROFILE },
} = PrivateRoutes;

const ITEMS: MenuItem[] = [
  {
    label: "Profile",
    icon: "pi pi-user",
    url: ADMIN + "/" + PROFILE,
  },

  {
    label: "Logout",
    icon: "pi pi-sign-out",
  },
];

export const Header = () => {
  const [collapseMenu, setCollapseMenu] = useState<boolean>(false);
  const [visible, setVisible] = useState(false);

  const handleToggleOpen = () => setCollapseMenu(!collapseMenu);
  const handleToggleClose = () => setCollapseMenu(false);

  return (
    <HeaderLayout visibleAlert={false}>
      <SidebarPrivate
        collapseMenu={collapseMenu}
        handleToggleClose={handleToggleClose}
      >
        <SidebarContent />
      </SidebarPrivate>

      <div className="ml-auto mt-3">
        <div className="flex items-center space-x-6">
          <i
            onClick={() => setVisible(true)}
            className="pi pi-search cursor-pointer text-xl text-black dark:text-white"
          ></i>
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
