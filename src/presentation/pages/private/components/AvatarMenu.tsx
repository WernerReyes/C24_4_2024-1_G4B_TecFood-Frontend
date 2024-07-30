import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import {
  Avatar,
  Menu,
  MenuItem,
  MenuRef,
} from "@/presentation/core/components";
import { useAuthStore, useUserStore } from "@/presentation/hooks";

type Props = {
  items: MenuItem[];
};

export const AvatarMenu = ({ items }: Props) => {
  const menuLeft = useRef<MenuRef>(null);
  const avatarRef = useRef(null);
  const { authenticatedUser, startLogout } = useAuthStore();
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const { user } = useUserStore();
  const [currentProfile, setCurrentProfile] = useState<string>("");

  useEffect(() => {
    if (user.img) setCurrentProfile(user.img);
  }, [user.img]);

  return (
    <div className="relative">
      <div ref={avatarRef} onClick={() => setShowMenu(!showMenu)}>
        <Avatar
          image={currentProfile || authenticatedUser.img}
          imageAlt="avatar"
          label={authenticatedUser.name[0].toUpperCase()}
          shape="circle"
          id="popup_menu_left"
          className="relative border-2 border-primary bg-primary text-white"
          onClick={(event) => menuLeft.current?.toggle(event)}
          itemRef="popup_menu_left"
        />
      </div>

      <Menu
        id="popup_menu_left"
        model={addLogout(items, startLogout)}
        aria-controls="popup_menu_left"
        className={clsx(!showMenu ? "hidden" : "fixed", "right-20")}
        popupAlignment="left"
        ref={menuLeft}
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
