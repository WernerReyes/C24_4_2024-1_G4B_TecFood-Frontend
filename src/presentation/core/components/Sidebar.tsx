import { SidebarProps, Sidebar as SidebarPrimeReact } from "primereact/sidebar";

interface Props extends SidebarProps {}

export const Sidebar = ({ ...props }: Props) => {
  return <SidebarPrimeReact {...props} />;
};
