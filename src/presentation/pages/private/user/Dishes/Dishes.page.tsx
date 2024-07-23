import { useEffect, useState } from "react";
import { useWindowSize } from "@/presentation/hooks";
import { DishesList } from "./components";
import { FilterAndTotalDishes, FilterSection } from "../components";
import { Sidebar } from "@/presentation/core/components";
import { UserLayout } from "../layout";

const DishesPage = () => {
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
      <div className="mx-5 mt-10 grid grid-cols-4 gap-x-5 md:mx-20">
        <section className="col-span-1 hidden lg:block">
          <FilterSection />
        </section>
        <section className="col-span-4 flex h-full flex-col lg:col-span-3">
          <FilterAndTotalDishes setVisbleSidebar={setVisibleSidebar} />
          <DishesList />
        </section>
      </div>
    </UserLayout>
  );
};

export default DishesPage;
