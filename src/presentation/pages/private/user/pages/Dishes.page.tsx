import { useWindowSize } from "@/presentation/hooks";
import { UserLayout } from "../layout";
import { useEffect, useState } from "react";
import { DishesList, FilterAndTotalDishes, FilterSection } from "../components";

const DishesPage = () => {
  const { isDesktop } = useWindowSize();
  const [visbleSidebar, setVisbleSidebar] = useState(false);

  useEffect(() => {
    if (isDesktop) {
      setVisbleSidebar(false);
    }
  }, [isDesktop]);
  return (
    <UserLayout
      visibleSidebar={visbleSidebar}
      setVisibleSidebar={setVisbleSidebar}
    >
      <main className="mx-5 mt-10 grid grid-cols-4 gap-x-5 md:mx-20">
        <section className="col-span-1 hidden lg:block">
          <FilterSection />
        </section>
        <section className="col-span-4 lg:col-span-3 flex flex-col h-full">
          <FilterAndTotalDishes setVisbleSidebar={setVisbleSidebar} />
          <DishesList />
        </section>
      </main>
    </UserLayout>
  );
};

export default DishesPage;
