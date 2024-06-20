import { useEffect } from "react";
import { GetDishesDto } from "@/domain/dtos";
import { Paginator } from "@/presentation/components";
import { useCartStore, useDishStore, usePaginator } from "@/presentation/hooks";

type Props = {
  children: React.ReactNode;
  rowPerPage: number[];
  paginators?: [boolean, boolean];
};

export const DishesLayout = ({ rowPerPage, children, paginators }: Props) => {
  const { handlePageChange, currentPage, limit, first } = usePaginator(
    rowPerPage[0],
  );
  const { total, startLoadingDishes, filters } = useDishStore();
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

  return (
    <>
      {paginators && paginators[0] && (
        <Paginator
          first={first}
          rows={limit}
          totalRecords={total}
          onPageChange={handlePageChange}
          rowsPerPage={rowPerPage}
          className="mt-auto flex mb-4 justify-end bg-transparent"
        />
      )}
      {children}
      {paginators && paginators[1] && (
        <Paginator
          first={first}
          rows={limit}
          totalRecords={total}
          onPageChange={handlePageChange}
          rowsPerPage={rowPerPage}
          className="flex mt-5 lg:mt-auto justify-end bg-transparent"
        />
      )}
    </>
  );
};
