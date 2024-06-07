import { useRef } from "react";
import { Avatar, Menu, MenuItem, MenuRef } from "@/presentation/components";
import { useAuthStore } from "@/presentation/hooks";

type Props = {
  items: MenuItem[];
};

export const AvatarMenu = ({ items }: Props) => {
  const menuLeft = useRef<MenuRef>(null);
  const { user, startLogout } = useAuthStore();
  return (
    <>
      <Avatar
        image={user.img}
        imageAlt="avatar"
        label={user.name[0].toUpperCase()}
        shape="circle"
        className="bg-primary  text-white"
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
