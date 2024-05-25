import { RoleEnum } from "@/domain/entities";
import { BreadCrumb } from "@/presentation/components";
import { ThemeLayout } from "@/presentation/layout";
import { Dishes, Header } from "../components";

export const HomePage = () => {
  return (
    <ThemeLayout colorTheme="dark:bg-dashboard-dark bg-white dark:text-white">
      <Header />
      <BreadCrumb role={RoleEnum.ROLE_USER} />
      <main className="mx-5 mt-10 grid grid-cols-4 md:mx-20">
        <section className="col-span-1 hidden md:block">
          <h1>Home Page</h1>
        </section>
        <section className="col-span-4 md:col-span-3 grid">
          <Dishes />
        </section>
      </main>
    </ThemeLayout>
  );
};

export default HomePage;
