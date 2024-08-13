import { useEffect, useState } from "react";
import clsx from "clsx";
import {
  Avatar,
  Menu,
  MenuItem,
} from "@/presentation/core/components";
import { useAuthStore, useUserStore } from "@/presentation/hooks";

type Props = {
  items: MenuItem[];
};

export const AvatarMenu = ({ items }: Props) => {
  const { authenticatedUser, startLogout } = useAuthStore();
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const { user } = useUserStore();
  const [currentProfile, setCurrentProfile] = useState<string>("");

  useEffect(() => {
    if (user.img) setCurrentProfile(user.img);
  }, [user.img]);

  return (
    <div className="relative">
      <div  onClick={() => setShowMenu(!showMenu)}>
        <Avatar
          image={currentProfile || authenticatedUser.img as string | undefined}
          imageAlt="avatar"
          label={authenticatedUser.name[0].toUpperCase()}
          shape="circle"
          id="popup_menu_left"
          className="relative border-2 border-primary bg-primary text-white cursor-pointer"
          itemRef="popup_menu_left"
        />
      </div>

      <Menu
        id="popup_menu_left"
        model={addLogout(items, startLogout)}
        aria-controls="popup_menu_left"
        className={clsx(!showMenu ? "hidden" : "fixed", "right-20")}
        popupAlignment="left"
      />
    </div>
  );
};

const addLogout = (items: MenuItem[], logout: () => void): MenuItem[] => {
  items.map((item) => {
    if (item.label === "Logout") item.command = () => logout();
    return item;
  });

  return items;
};
