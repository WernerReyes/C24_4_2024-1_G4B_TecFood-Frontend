import clsx from "clsx";
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
      }}
    />
  );
});
