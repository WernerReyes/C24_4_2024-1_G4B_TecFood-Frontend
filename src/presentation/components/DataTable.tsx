import {
  DataTable as DataTablePrimeReact,
  type DataTablePropsCell,
  type DataTablePropsMultiple,
  type DataTablePropsSingle,
  type DataTableValueArray,
} from "primereact/datatable";

type Props<TValue extends DataTableValueArray> =
  | DataTablePropsSingle<TValue>
  | DataTablePropsCell<TValue>
  | DataTablePropsMultiple<TValue>;

export const DataTable = <TValue extends DataTableValueArray>({
  ...props
}: Props<TValue>) => {
  return (
    <DataTablePrimeReact
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
      }}
    />
  );
};


