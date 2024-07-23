import { Sidebar } from "@/presentation/core/components";
import { useWindowSize } from "@/presentation/hooks";
import { useEffect, useState } from "react";
import { FilterAndTotalDishes, FilterSection } from "../components";
import { Dishes } from "./components";
import { UserLayout } from "../layout";

export const HomePage = () => {
  const { isDesktop } = useWindowSize();
  const [visibleSidebar, setVisibleSidebar] = useState(false);

  useEffect(() => {
    if (isDesktop) {
      setVisibleSidebar(false);
    }
  }, [isDesktop]);

  return (
    <UserLayout>
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
      <div className="mx-5 mt-10 grid grid-cols-4 lg:mx-20">
        <section className="col-span-1 me-6 hidden lg:block">
          <FilterSection />
        </section>
        <section className="col-span-4 flex flex-col lg:col-span-3">
          <FilterAndTotalDishes setVisbleSidebar={setVisibleSidebar} />
          <Dishes />
        </section>
      </div>
    </UserLayout>
  );
};

export default HomePage;
