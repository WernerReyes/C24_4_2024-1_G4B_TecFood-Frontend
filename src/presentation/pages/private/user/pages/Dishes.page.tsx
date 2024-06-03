import { useWindowSize } from "@/presentation/hooks";
import { UserLayout } from "../layout";
import { useEffect, useState } from "react";
import { FilterSection } from "../components";

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
     <main className="mx-5 mt-10 grid grid-cols-4 lg:mx-20">
        <section className="col-span-1 me-6 hidden md:block">
          <FilterSection />
        </section>
        <section className="col-span-4 flex flex-col md:col-span-3">
          <h1 className="text-2xl font-semibold">Dishes</h1>
        </section>
      </main>
    </UserLayout>
  );
};

export default DishesPage;
