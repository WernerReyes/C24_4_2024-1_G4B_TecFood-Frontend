import {
  type ConfirmDialogProps,
  ConfirmDialog as ConfirmDialogPrimeReact,
} from "primereact/confirmdialog";

interface Props extends ConfirmDialogProps {}
export const ConfirmDialog = ({ ...props }: Props) => {
  return <ConfirmDialogPrimeReact {...props} />;
};
