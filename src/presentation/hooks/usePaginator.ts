import { useEffect, useState } from "react";
import { PaginatorPageChangeEvent } from "../components";

export const usePaginator = (initialLimit: number) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [first, setFirst] = useState<number>(currentPage * initialLimit - initialLimit);
  const [limit, setLimit] = useState<number>(initialLimit);

  const handlePageChange = (event: PaginatorPageChangeEvent) => {
    setCurrentPage(event.page + 1);
    setLimit(event.rows);
  };

  useEffect(() => {
    setFirst(currentPage * limit - limit);
  }, [currentPage, limit]);

  return { currentPage, limit, first,  handlePageChange };
};
