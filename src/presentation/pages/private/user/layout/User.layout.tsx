import { useEffect } from "react";
import { RoleEnum } from "@/domain/entities";
import { BreadCrumb, Sidebar } from "@/presentation/components";
import { useWindowSize } from "@/presentation/hooks";
import { ThemeLayout } from "@/presentation/layout";
import { FilterSection, Header } from "../components";


const SCROLL_ID = "user-panel";

type Props = {
  children: React.ReactNode;
  visibleSidebar?: boolean;
  setVisibleSidebar?: (value: boolean) => void;
};

export const UserLayout = ({
  children,
  visibleSidebar,
  setVisibleSidebar,
}: Props) => {
  const { isDesktop } = useWindowSize();

  useEffect(() => {
    if (isDesktop && visibleSidebar) {
        setVisibleSidebar!(false);
    }
  }, [isDesktop]);

  return (
    <ThemeLayout to={SCROLL_ID} colorTheme="dark:bg-dashboard-dark bg-white dark:text-white">
      <Header scrollId={SCROLL_ID} />
      <BreadCrumb role={RoleEnum.ROLE_USER} />
      <Sidebar visible={visibleSidebar} onHide={() => {
        if (setVisibleSidebar) {
          setVisibleSidebar(false);
        }
      }}>
        <FilterSection />
      </Sidebar>
      {children}
    </ThemeLayout>
  );
};
