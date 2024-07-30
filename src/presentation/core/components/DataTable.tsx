import clsx from "clsx";
import type { ColumnPassThroughMethodOptions } from "primereact/column";
import {
  type DataTableSelectionMultipleChangeEvent as DataTableSelectionMultipleChangeEventPrimeReact,
  DataTable as DataTablePrimeReact,
  type DataTablePropsCell,
  type DataTablePropsMultiple,
  type DataTablePropsSingle,
  type DataTableValueArray,
} from "primereact/datatable";
import { type PaginatorPassThroughMethodOptions } from "primereact/paginator";
import React, { createRef, forwardRef, useImperativeHandle } from "react";

export interface DataTableSelectionMultipleChangeEvent<
  TValue extends DataTableValueArray,
> extends DataTableSelectionMultipleChangeEventPrimeReact<TValue> {}

type Props<TValue extends DataTableValueArray> =
  | DataTablePropsSingle<TValue>
  | DataTablePropsCell<TValue>
  | DataTablePropsMultiple<TValue>;

export interface DataTableRef {
  exportCSV(): void;
}

export const DataTable = forwardRef(function DataTable2<
  TValue extends DataTableValueArray,
>(props: Props<TValue>, ref: React.Ref<DataTableRef>) {
  const dataTableRef = createRef<DataTablePrimeReact<TValue>>();
  useImperativeHandle(ref, () => ({
    exportCSV: () => dataTableRef.current?.exportCSV(),
  }));

  return (
    <DataTablePrimeReact
      ref={dataTableRef}
      {...props}
      pt={{
        ...props.pt,
        footer: { className: "py-6 bg-transparent" },
        header: {
          className: "border-b-2 bg-transparent dark:border-slate-700",
        },
        headerRow: { className: "border-b-2 dark:border-slate-700" },
        bodyRow: {
          className: "border-b-2 bg-transparent dark:border-slate-700",
        },
        paginator: {
          pageButton: ({ context }: PaginatorPassThroughMethodOptions) => ({
            className: clsx(
              "dark:border-blue-300 dark:text-white", // Dark Mode
              {
                "bg-primary border-primary text-white dark:bg-primary":
                  context.active,
              },
            ),
          }),
        },
        column: {
          headerCheckbox: ({ context }: ColumnPassThroughMethodOptions) => ({
            className: clsx(
              "flex items-center justify-center",
              "border-2 w-6 h-6 text-gray-600 rounded-lg transition-colors duration-200",
              context.checked
                ? "border-none"
                : "border-gray-300 bg-white dark:border-blue-900/40 dark:bg-gray-900",
              {
                "hover:border-primary dark:hover:border-primary focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)] dark:focus:shadow-[inset_0_0_0_0.2rem_rgba(147,197,253,0.5)]":
                  !context.disabled,
                "cursor-default opacity-60": context.disabled,
              },
            ),
          }),
          rowCheckbox({ context }: ColumnPassThroughMethodOptions) {
            return {
              className: clsx(
                "flex items-center justify-center",
                "border-2 w-6 h-6 text-gray-600 rounded-lg transition-colors duration-200",
                context.checked
                  ? "border-none"
                  : "border-gray-300 bg-white dark:border-blue-900/40 dark:bg-gray-900",
                {
                  "hover:border-primary dark:hover:border-primary focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)] dark:focus:shadow-[inset_0_0_0_0.2rem_rgba(147,197,253,0.5)]":
                    !context.disabled,
                  "cursor-default opacity-60": context.disabled,
                },
              ),
            };
          },
        },
      }}
    />
  );
});
