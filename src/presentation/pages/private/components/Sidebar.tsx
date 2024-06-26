import {
  Image,
  Sidebar as SidebarComponent
} from "@/presentation/components";
import { useThemeStore } from "@/presentation/hooks";
import { LinksToNavigate } from "./Links-to-navigate";

type Props = {
  collapseMenu: boolean;
  handleToggleClose: () => void;
  links: { label: string; url: string }[];
};

export const Sidebar = ({ collapseMenu, handleToggleClose, links }: Props) => {
  const { isDark } = useThemeStore();

  return (
    <SidebarComponent visible={collapseMenu} onHide={handleToggleClose}>
      <ul>
        <li className="mb-6 hidden max-lg:block">
          <Image
            src={isDark ? "/logo-dark.svg" : "/logo.svg"}
            alt="logo"
            width="96"
          />
        </li>

        <LinksToNavigate
          links={links}
          className="dark:border-slate-700 max-lg:border-b max-lg:py-4"
        />
      </ul>
    </SidebarComponent>
  );
};
