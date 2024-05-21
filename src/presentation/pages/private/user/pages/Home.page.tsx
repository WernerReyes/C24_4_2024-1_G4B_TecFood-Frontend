import { BreadCrumb } from "@/presentation/components";
import { Dishes, Header } from "../components";
import { RoleEnum } from "@/domain/entities";
import { ThemeLayout } from "@/presentation/layout";

export const HomePage = () => {
  return (
    <ThemeLayout
     colorTheme="dark:bg-dashboard-dark bg-white dark:text-white"
    >
      <Header />
      <BreadCrumb role={RoleEnum.ROLE_USER} />
      <main className="grid grid-cols-4 mt-10 mx-5 md:mx-20">
        <section className="hidden md:block col-span-1">
          <h1>Home Page</h1>
        </section>
        <section className="col-span-4 md:col-span-3">
          <Dishes />
        </section>
      </main>
    </ThemeLayout>
  );
};

export default HomePage;
