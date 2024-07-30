import {
  Dropdown as DropdownPrimeReact,
  DropdownProps,
} from "primereact/dropdown";
import { forwardRef } from "react";

interface Props extends DropdownProps {}
export const Dropdown = forwardRef<DropdownPrimeReact, Props>(
  ({ ...props }, ref) => {
    return <DropdownPrimeReact {...props} ref={ref} />;
  },
);
