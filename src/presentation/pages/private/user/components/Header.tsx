import { Avatar, Button, Image, InputSearch } from "@/presentation/components";
import { useAuthStore } from "@/presentation/hooks";
import clsx from "clsx";
import { Badge } from "primereact/badge";
import { Menu } from "primereact/menu";
import { useRef, useState } from "react";

const items = [
  {
    label: "Profile",
    items: [
      {
        label: "Settings",
        icon: "pi pi-cog",
      },
      {
        label: "Logout",
        icon: "pi pi-sign-out",
      },
    ],
  },
];

export const Header = () => {
  const menuLeft = useRef<Menu>(null);
  const { user } = useAuthStore();
  const [collapseMenu, setCollapseMenu] = useState<string>("hidden");

  const handleToggleOpen = () => setCollapseMenu("");

  const handleToggleClose = () => setCollapseMenu("hidden");

  return (
    <header className="relative z-50 flex min-h-[80px] border-b bg-white px-6 py-4 font-[sans-serif] tracking-wide sm:px-8">
      <div className="flex w-full flex-wrap items-center gap-4 lg:gap-y-2">
        <Image src="/logo.svg" alt="logo" width="80" />

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
              <a href="javascript:void(0)">
                <img
                  src="https://readymadeui.com/readymadeui.svg"
                  alt="logo"
                  className="w-36"
                />
              </a>
            </li>
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

        <div className="ml-auto flex  gap-y-4">
          <InputSearch
            placeholder="Search something..."
            iconClassName={clsx(
              "hidden cursor-pointer text-primary",
              "lg:block",
            )}
            className={clsx(
              "hidden w-full rounded-lg border-2 border-primary bg-transparent p-2 text-sm outline-none placeholder:text-primary",
              "lg:block",
            )}
          />

          <div className="flex items-center space-x-6">
            <i
              className={clsx(
                "pi pi-search cursor-pointer text-xl",
                "lg:hidden",
              )}
            ></i>
            <i className="pi pi-heart-fill p-overlay-badge text-2xl text-red-600">
              <Badge value="0" className="bg-primary" size="normal" />
            </i>
            <i className="pi pi-shopping-cart p-overlay-badge text-2xl">
              <Badge value="0" className="bg-primary" size="normal" />
            </i>

            <Avatar
              image={user.img}
              label={user.name[0]}
              shape="circle"
              className="bg-primary text-white"
              onClick={(event) => menuLeft.current?.toggle(event)}
              aria-haspopup
            ></Avatar>

            <Menu model={items} popup ref={menuLeft} id="popup_menu_left" />

            <Button unstyled onClick={handleToggleOpen} className="lg:hidden">
              <i className="pi pi-bars text-2xl"></i>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
