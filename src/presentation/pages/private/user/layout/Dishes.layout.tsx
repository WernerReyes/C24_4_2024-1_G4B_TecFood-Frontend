import { GetDishesDto } from "@/domain/dtos";
import { Paginator } from "@/presentation/components";
import { useCartStore, useDishStore, usePaginator } from "@/presentation/hooks";
import { useEffect } from "react";

type Props = {
  children: React.ReactNode;
  rowPerPage: number[];
  paginator?: boolean;
};

export const DishesLayout = ({ rowPerPage, children, paginator }: Props) => {
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
      {children}
      {paginator && (
        <Paginator
          first={first}
          rows={limit}
          totalRecords={total}
          onPageChange={handlePageChange}
          rowsPerPage={rowPerPage}
          className="mt-auto flex justify-end bg-transparent"
        />
      )}
    </>
  );
};
