import { Image, Sidebar } from "@/presentation/core/components";
import { useThemeStore, useWindowSize } from "@/presentation/hooks";
import { useEffect } from "react";

type Props = {
  collapseMenu: boolean;
  handleToggleClose: () => void;
  children?: React.ReactNode;
};

export const SidebarPrivate = ({
  collapseMenu,
  handleToggleClose,
  children,
}: Props) => {
  const { isDark } = useThemeStore();
  const { width, lg } = useWindowSize();

  useEffect(() => {
    if (width > lg) {
      handleToggleClose();
    }
  }, [width]);

  return (
    <Sidebar
      visible={collapseMenu}
      closeOnEscape={true}
      className=" dark:bg-skeleton-darker"
      onHide={handleToggleClose}
    >
      <ul>
        <li className="flexjustify-center mb-6">
          <Image
            src={isDark ? "/logo-dark.svg" : "/logo.svg"}
            alt="logo"
            imageClassName="w-32 mx-auto"
          />
        </li>
        {children}
      </ul>
    </Sidebar>
  );
};
