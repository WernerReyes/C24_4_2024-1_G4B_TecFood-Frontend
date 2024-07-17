import { MenubarProps, Menubar as MenubarPrimeReact } from "primereact/menubar";

interface Props extends MenubarProps {}

export const Menubar = ({ ...props }: Props) => {
  return <MenubarPrimeReact {...props} />;
};
