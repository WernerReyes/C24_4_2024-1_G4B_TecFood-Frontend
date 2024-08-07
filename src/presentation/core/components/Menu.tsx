import { forwardRef, useImperativeHandle, useRef } from "react";
import { Menu as MenuPrimeReact, type MenuProps } from "primereact/menu";
import { type MenuItem as MenuItemPrimeReact } from "primereact/menuitem";

interface Props extends MenuProps {}

export interface MenuItem extends MenuItemPrimeReact {}

export type MenuRef = {
  toggle(event: React.SyntheticEvent): void;
  show(event: React.SyntheticEvent): void;
  hide(event: React.SyntheticEvent): void;
};

export const Menu = forwardRef<MenuRef, Props>((props, ref) => {
  const menuRef = useRef<MenuPrimeReact>(null);

  useImperativeHandle(ref, () => ({
    toggle(event) {
      menuRef.current?.toggle(event);
    },
    show(event) {
      menuRef.current?.show(event);
    },
    hide(event) {
      menuRef.current?.hide(event);
    },
  }));

  return <MenuPrimeReact {...props} ref={menuRef} />;
});
