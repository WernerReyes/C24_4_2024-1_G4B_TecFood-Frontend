import { useWindowSize } from "@/presentation/hooks";
import { useEffect, useState } from "react";
import { Dishes, FilterSection } from "../components";
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
        <section className="col-span-1 me-6 hidden md:block">
          <FilterSection />
        </section>
        <section className="col-span-4 flex flex-col md:col-span-3">
          <Dishes setVisible={setVisbleSidebar} />
        </section>
      </main>
    </UserLayout>
  );
};

export default HomePage;
