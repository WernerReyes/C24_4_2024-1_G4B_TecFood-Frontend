import { useEffect, useRef, useState } from "react";
import { Avatar, Menu, MenuItem, MenuRef } from "@/presentation/core/components";
import { useAuthStore, useUserStore } from "@/presentation/hooks";

type Props = {
  items: MenuItem[];
};

export const AvatarMenu = ({ items }: Props) => {
  const menuLeft = useRef<MenuRef>(null);
  const { authenticatedUser, startLogout } = useAuthStore();
  const { user } = useUserStore();
  const [currentProfile, setCurrentProfile] = useState<string>("");

  useEffect(() => {
    if (user.img) setCurrentProfile(user.img);
  }, [user.img]);

  return (
    <>
      <Avatar
        image={currentProfile || authenticatedUser.img}
        imageAlt="avatar"
        label={authenticatedUser.name[0].toUpperCase()}
        shape="circle"
        className="border-2 border-primary bg-primary text-white"
        onClick={(event) => menuLeft.current?.toggle(event)}
        aria-haspopup
      />

      <Menu model={addLogout(items, startLogout)} popup ref={menuLeft} />
    </>
  );
};

const addLogout = (items: MenuItem[], logout: () => void): MenuItem[] => {
  items.map((item) => {
    if (item.label === "Logout") item.command = () => logout();
    return item;
  });

  return items;
};
