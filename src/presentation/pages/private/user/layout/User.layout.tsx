import { useEffect } from "react";
import { GetDishesDto } from "@/domain/dtos";
import { RoleEnum } from "@/domain/entities";
import { BreadCrumb, Sidebar } from "@/presentation/components";
import { useCartStore, useDishStore, usePaginatorStore, useWindowSize } from "@/presentation/hooks";
import { ThemeLayout } from "@/presentation/layout";
import { FilterSection, Header } from "../components";


const SCROLL_ID = "user-panel";

type Props = {
  children: React.ReactNode;
  visibleSidebar?: boolean;
  setVisibleSidebar?: (value: boolean) => void;
};

export const UserLayout = ({
  children,
  visibleSidebar,
  setVisibleSidebar,
}: Props) => {
  const { isDesktop } = useWindowSize();

  const { startLoadingDishes, filters } = useDishStore();
  const { currentPage, limit, } = usePaginatorStore();
  const { startLoadingDishesByUser, totalQuantity } = useCartStore();

  useEffect(() => {
    const getDishesDto = GetDishesDto.create({
      page: currentPage,
      limit: limit,
      idCategory: filters.idCategory,
      priceRange: filters.priceRange,
      search: null,
    });
    startLoadingDishes(getDishesDto);
  }, [currentPage, limit, filters]);

  useEffect(() => {
    startLoadingDishesByUser();
  }, [totalQuantity]);

  useEffect(() => {
    if (isDesktop && visibleSidebar) {
        setVisibleSidebar!(false);
    }
  }, [isDesktop]);

  return (
    <ThemeLayout to={SCROLL_ID} colorTheme="dark:bg-dashboard-dark bg-white dark:text-white">
      <Header scrollId={SCROLL_ID} />
      <BreadCrumb role={RoleEnum.ROLE_USER} />
      <Sidebar visible={visibleSidebar} onHide={() => {
        if (setVisibleSidebar) {
          setVisibleSidebar(false);
        }
      }}>
        <FilterSection />
      </Sidebar>
      {children}
      {/* <main className="mx-5 mt-10 grid grid-cols-4 lg:mx-20">
        <section className="col-span-1 me-6 hidden md:block">
          <FilterSection />
        </section>
        <section className="col-span-4 flex flex-col md:col-span-3"></section>
      </main> */}
    </ThemeLayout>
  );
};
