import { useEffect } from "react";
import { RoleEnum } from "@/domain/entities";
import { BreadCrumb } from "@/presentation/core/components";
import { useCartStore } from "@/presentation/hooks";
import { ThemeLayout } from "@/presentation/layout";
import { ChatBot } from "../../components";
import { Header } from "../components";

const SCROLL_ID = "user-panel";

type Props = {
  children: React.ReactNode;
};

export const UserLayout = ({ children }: Props) => {
  const { startLoadingTotalDishesByUser } = useCartStore();

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
      {children}
      <ChatBot to={SCROLL_ID} />
    </ThemeLayout>
  );
};
