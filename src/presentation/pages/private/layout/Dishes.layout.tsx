import { useEffect } from "react";
import { GetDishesDto } from "@/domain/dtos";
import { Paginator } from "@/presentation/core/components";
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
  const { total, startLoadingDishesPaginated, filters } = useDishStore();
  const { startLoadingDishesByUser, totalQuantity } = useCartStore();

  useEffect(() => {
    const getDishesDto = new GetDishesDto(
      currentPage,
      limit,
      filters.idCategory,
      filters.priceRange,
      null,
    );
    startLoadingDishesPaginated(getDishesDto);
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
          className="mb-4 mt-auto flex justify-end bg-transparent"
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
          className="mt-5 flex justify-end bg-transparent lg:mt-auto"
        />
      )}
    </>
  );
};
