import { DialogProps, Dialog as DialogPrimeReact } from "primereact/dialog";

interface Props extends DialogProps {}

export const Dialog = ({ ...props }: Props) => {
  return <DialogPrimeReact {...props} />;
};
