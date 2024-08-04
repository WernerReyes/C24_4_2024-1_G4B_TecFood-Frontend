import {
  type PickListProps,
  PickList as PickListPrimeReact,
  type PickListChangeEvent as PickListChangeEventPrimeReact,
} from "primereact/picklist";

export interface PickListChangeEvent extends PickListChangeEventPrimeReact {}

interface Props extends PickListProps {}

export const PickList = ({ ...props }: Props) => {
  return <PickListPrimeReact {...props} />;
};
