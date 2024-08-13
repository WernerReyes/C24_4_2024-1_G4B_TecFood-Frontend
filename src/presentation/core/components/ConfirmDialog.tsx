import clsx from "clsx";
import {
  type ConfirmDialogProps,
  ConfirmDialog as ConfirmDialogPrimeReact,
} from "primereact/confirmdialog";

interface Props extends ConfirmDialogProps {}
export const ConfirmDialog = ({ ...props }: Props) => {
  return (
    <ConfirmDialogPrimeReact
      acceptClassName={clsx("bg-primary p-2 px-3", props.acceptClassName)}
      rejectClassName={clsx("bg-transparent p-2 px-3", props.rejectClassName)}
      {...props}
    />
  );
};
