import clsx from "clsx";
import {
  PaginatorPageChangeEvent as PaginatorPageChangeEventPrimeReact,
  PaginatorPassThroughMethodOptions,
  Paginator as PaginatorPrimeReact,
  PaginatorProps,
} from "primereact/paginator";
import { useState } from "react";
import { usePaginatorStore } from "../hooks";

export interface PaginatorPageChangeEvent
  extends PaginatorPageChangeEventPrimeReact {}

interface Props extends PaginatorProps {
  rowsPerPage: number[];
}

export const Paginator = ({ rowsPerPage, ...props }: Props) => {
  const { startChangePaginator, total, next, previous, currentPage, limit } = usePaginatorStore();
  const [first, setFirst] = useState<number>(currentPage * limit! - limit!);
  const [rows, setRows] = useState<number>(rowsPerPage[0]);

  const onPageChange = (event: PaginatorPageChangeEvent) => {
    startChangePaginator({
      currentPage: event.page + 1,
      limit: event.rows,
      total,
      next,
      previous,
    });
    setFirst(event.first);
    setRows(event.rows);
  };

  return (
    <PaginatorPrimeReact
      first={first}
      rows={rows}
      totalRecords={total}
      rowsPerPageOptions={rowsPerPage}
      onPageChange={onPageChange}
      {...props}
      pt={{
        pageButton: ({ context }: PaginatorPassThroughMethodOptions) => ({
          className: clsx(
            "dark:border-blue-300 dark:text-white", // Dark Mode

            {
              "bg-primary border-primary text-white dark:bg-primary":
                context.active,
            },
          ),
        }),
      }}
    />
  );
};
