import {
  type ColumnProps,
  Column as ColumnPrimeReact,
} from "primereact/column";

interface Props extends ColumnProps {}

export const Column = ({ ...props }: Props) => {
  return <ColumnPrimeReact {...props} />;
};
