import {
  type MultiStateCheckboxProps,
  MultiStateCheckbox as MultiStateCheckboxPrimeReact,
} from "primereact/multistatecheckbox";

interface Props extends MultiStateCheckboxProps {}

export const MultiStateCheckbox = ({ ...props }: Props) => {
  return <MultiStateCheckboxPrimeReact {...props} />;
};
