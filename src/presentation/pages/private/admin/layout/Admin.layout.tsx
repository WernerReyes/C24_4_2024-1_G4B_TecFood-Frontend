import { RoleEnum } from "@/domain/entities";
import { BreadCrumb, Image, Sidebar } from "@/presentation/core/components";
import { useThemeStore } from "@/presentation/hooks";
import { ThemeLayout } from "@/presentation/layout";
import { ChatBot } from "../../components";
import { Header, SidebarContent } from "../components";

const SCROLL_ID = "admin-panel";

type Props = {
  children: React.ReactNode;
  visibleSidebar?: boolean;
  setVisibleSidebar?: (value: boolean) => void;
};

export const AdminLayout = ({
  children,
  visibleSidebar,
  setVisibleSidebar,
}: Props) => {
  const { isDark } = useThemeStore();
  return (
    <ThemeLayout
      showIconTheme={false}
      colorTheme="dark:bg-dashboard-dark bg-white dark:text-white"
    >
      <section className="flex">
        <div className="hidden lg:block col-span-1 lg:w-1/5">
          <div className="fixed h-full w-1/5 border-r-2 px-4 border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-center my-5">
              <Image
                src={isDark ? "/logo-dark.svg" : "/logo.svg"}
                alt="logo"
                imageClassName="w-32"
              />
            </div>
           <SidebarContent />
          </div>
        </div>
        <section className="w-full lg:w-4/5">
          <Header />
          <BreadCrumb scrollId={SCROLL_ID} role={RoleEnum.ROLE_ADMIN} />
          <Sidebar
            visible={visibleSidebar}
            onHide={() => {
              if (setVisibleSidebar) {
                setVisibleSidebar(false);
              }
            }}
          ></Sidebar>
          {children}
        </section>
        <ChatBot to={SCROLL_ID} />
      </section>
    </ThemeLayout>
  );
};
