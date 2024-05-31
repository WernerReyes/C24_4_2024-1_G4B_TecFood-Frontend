import { RoleEnum } from "@/domain/entities";
import { BreadCrumb, Sidebar } from "@/presentation/components";
import { ThemeLayout } from "@/presentation/layout";
import { Dishes, FilterSection, Header } from "../components";
import { useEffect, useState } from "react";
import { useWindowSize } from "@/presentation/hooks";

export const HomePage = () => {
  const { isDesktop } = useWindowSize();
  const [visbleSidebar, setVisbleSidebar] = useState(false);


  useEffect(() => {
    if (isDesktop) {
      setVisbleSidebar(false);
    }
  }, [isDesktop]);


  return (
    <ThemeLayout colorTheme="dark:bg-dashboard-dark bg-white dark:text-white">
      <Header />
      <BreadCrumb role={RoleEnum.ROLE_USER} />
      <main className="mx-5 mt-10 grid grid-cols-4 lg:mx-20">
        <section className="col-span-1 me-6 hidden md:block">
          <FilterSection />
          {/* <FilterSection /> */}
          <Sidebar
            visible={visbleSidebar}
            onHide={() => setVisbleSidebar(false)}
          >
            <FilterSection />
          </Sidebar>
        </section>
        <section className="col-span-4 flex flex-col md:col-span-3">
          <Dishes setVisible={setVisbleSidebar} />
        </section>
      </main>
    </ThemeLayout>
  );
};

export default HomePage;
