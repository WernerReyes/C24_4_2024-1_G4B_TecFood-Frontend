import { useWindowSize } from "@/presentation/hooks";
import { useEffect, useState } from "react";
import { Dishes, FilterAndTotalDishes, FilterSection } from "../components";
import { UserLayout } from "../layout";

export const HomePage = () => {
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
      <main className="mx-5 mt-10 grid grid-cols-4 lg:mx-20">
        <section className="col-span-1 me-6 hidden lg:block">
          <FilterSection />
        </section>
        <section className="col-span-4 flex flex-col lg:col-span-3">
          <FilterAndTotalDishes setVisbleSidebar={setVisbleSidebar} />
          <Dishes />
        </section>
      </main>
    </UserLayout>
  );
};

export default HomePage;
