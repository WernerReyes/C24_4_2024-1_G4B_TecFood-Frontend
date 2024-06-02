import clsx from "clsx";
import { useMatch } from "react-router-dom";
import { Image, Sidebar as SidebarComponent, Link } from "@/presentation/components";
import { useTheme } from "@/presentation/hooks";

type Props = {
  collapseMenu: boolean;
  handleToggleClose: () => void;
  links: { label: string; url: string }[];
};

export const Sidebar = ({ collapseMenu, handleToggleClose, links }: Props) => {
  const { isDark } = useTheme();

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

        {links.map((link, index) => {
          const match = useMatch(link.url);
          return (
            <li
              key={index}
              className="dark:border-slate-700 max-lg:border-b max-lg:py-3"
            >
              <Link
                to={link.url}
                className={clsx(
                  "block text-[15px] font-semibold hover:text-primary",
                  match ? "text-primary" : "text-[#333] dark:text-white",
                )}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </SidebarComponent>
  );
};
