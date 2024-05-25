import { Link, useMatch } from "react-router-dom";
import clsx from "clsx";
import { Button, Image } from "@/presentation/components";
import { useTheme } from "@/presentation/hooks";

type Props = {
  collapseMenu: string;
  handleToggleClose: () => void;
  links: { label: string; url: string }[];
};

export const Sidebar = ({ collapseMenu, handleToggleClose, links }: Props) => {
  const { isDark } = useTheme();

  return (
    <div
      className={clsx(
        collapseMenu,
        "before:fixed",
        "max-lg:before:inset-0 max-lg:before:z-50  max-lg:before:bg-black max-lg:before:opacity-50 lg:ml-10 lg:!block",
      )}
    >
      <Button
        unstyled
        onClick={handleToggleClose}
        className="fixed right-4 top-2 z-[100]  flex h-10 w-10 rounded-full dark:bg-dashboard-dark bg-white p-3 lg:hidden"
      >
        <i className="pi pi-times text-black dark:text-white font-extrabold"></i>
      </Button>

      <ul
        className={clsx(
          "z-50",
          "max-lg:fixed max-lg:left-0 max-lg:top-0 max-lg:h-full max-lg:min-w-[250px] max-lg:space-y-3 max-lg:overflow-auto dark:bg-dashboard-dark max-lg:bg-white max-lg:p-6 max-lg:shadow-md lg:flex lg:gap-x-3",
        )}
      >
        <li className="mb-6 hidden max-lg:block">
          <Image src={isDark ? "/logo-dark.svg" : "/logo.svg"} alt="logo" width="96" />
        </li>

        {links.map((link, index) => {
          const match = useMatch(link.url);
          return (
            <li key={index} className="px-3 max-lg:border-b max-lg:py-3 dark:border-slate-700">
              <Link
                to={link.url}
                className={clsx(
                  "block text-[15px] font-semibold hover:text-[#007bff]",
                  match ? "text-primary" : "text-[#333] dark:text-white",
                )}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
