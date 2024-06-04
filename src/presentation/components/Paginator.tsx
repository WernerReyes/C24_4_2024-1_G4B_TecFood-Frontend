import clsx from "clsx";
import {
  PaginatorPageChangeEvent as PaginatorPageChangeEventPrimeReact,
  PaginatorPassThroughMethodOptions,
  Paginator as PaginatorPrimeReact,
  PaginatorProps,
} from "primereact/paginator";

export interface PaginatorPageChangeEvent
  extends PaginatorPageChangeEventPrimeReact {}

interface Props extends PaginatorProps {
  rowsPerPage: number[];
}

export const Paginator = ({ rowsPerPage, ...props }: Props) => {
  return (
    <PaginatorPrimeReact
      rowsPerPageOptions={rowsPerPage}
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
