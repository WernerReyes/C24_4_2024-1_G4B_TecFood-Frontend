import { Button, Image } from "@/presentation/components";
import clsx from "clsx";
import { Link, NavLink, useMatch } from "react-router-dom";

type Props = {
  collapseMenu: string;
  handleToggleClose: () => void;
  links: { label: string; url: string }[];
};

export const Sidebar = ({
  collapseMenu,
  handleToggleClose,
  links,
}: Props) => {
  return (
    <div
      className={clsx(
        collapseMenu,
        "before:fixed max-lg:before:inset-0 max-lg:before:z-50 max-lg:before:bg-black max-lg:before:opacity-50 lg:ml-10 lg:!block",
      )}
    >
      <Button
        unstyled
        onClick={handleToggleClose}
        className="fixed right-4 top-2 z-[100] flex h-10 w-10 rounded-full bg-white p-3 lg:hidden"
      >
        <i className="pi pi-times font-extrabold"></i>
      </Button>

      <ul className="z-50 max-lg:fixed max-lg:left-0 max-lg:top-0 max-lg:h-full max-lg:w-1/2 max-lg:min-w-[300px] max-lg:space-y-3 max-lg:overflow-auto max-lg:bg-white max-lg:p-6 max-lg:shadow-md lg:flex lg:gap-x-3">
        <li className="mb-6 hidden max-lg:block">
          <Image src="/logo.svg" alt="logo" width="96" />
        </li>

        {links.map((link, index) => {
          const match = useMatch(link.url);
          return (
            <li key={index} className="px-3 max-lg:border-b max-lg:py-3">
              <Link
                to={link.url}
                className={`block text-[15px] font-semibold ${match ? "text-[#007bff]" : "text-[#333]"} hover:text-[#007bff]`}
              >
                {link.label}
              </Link>
            </li>
          );
        })}

        <li className="px-3 max-lg:border-b max-lg:py-3">
          <a
            href="javascript:void(0)"
            className="block text-[15px] font-semibold text-[#007bff] hover:text-[#007bff]"
          >
            New
          </a>
        </li>
        <li className="px-3 max-lg:border-b max-lg:py-3">
          <a
            href="javascript:void(0)"
            className="block text-[15px] font-semibold text-[#333] hover:text-[#007bff]"
          >
            Men
          </a>
        </li>
        <li className="px-3 max-lg:border-b max-lg:py-3">
          <a
            href="javascript:void(0)"
            className="block text-[15px] font-semibold text-[#333] hover:text-[#007bff]"
          >
            Women
          </a>
        </li>
        <li className="px-3 max-lg:border-b max-lg:py-3">
          <a
            href="javascript:void(0)"
            className="block text-[15px] font-semibold text-[#333] hover:text-[#007bff]"
          >
            Kids
          </a>
        </li>
      </ul>
    </div>
  );
};
