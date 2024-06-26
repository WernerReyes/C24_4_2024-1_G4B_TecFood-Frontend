import { useEffect } from "react";
import { RoleEnum } from "@/domain/entities";
import { BreadCrumb, Sidebar } from "@/presentation/components";
import { useCartStore, useWindowSize } from "@/presentation/hooks";
import { ThemeLayout } from "@/presentation/layout";
import { FilterSection, Header } from "../components";
import { ChatBot } from "../../components";

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
  const { startLoadingTotalDishesByUser } = useCartStore();

  useEffect(() => {
    if (isDesktop && visibleSidebar) {
      setVisibleSidebar!(false);
    }
  }, [isDesktop]);

  useEffect(() => {
    startLoadingTotalDishesByUser();
  }, []);

  return (
    <ThemeLayout
      showIconTheme={false}
      colorTheme="dark:bg-dashboard-dark bg-white dark:text-white"
    >
      <Header />
      <BreadCrumb scrollId={SCROLL_ID} role={RoleEnum.ROLE_USER} />
      <Sidebar
        visible={visibleSidebar}
        onHide={() => {
          if (setVisibleSidebar) {
            setVisibleSidebar(false);
          }
        }}
      >
        <FilterSection />
      </Sidebar>
      {children}
      <ChatBot to={SCROLL_ID} />
    </ThemeLayout>
  );
};
