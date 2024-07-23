import {
  type ToolbarProps,
  Toolbar as ToolbarPrimeReact,
} from "primereact/toolbar";

interface Props extends ToolbarProps {}

export const Toolbar = ({ ...props }: Props) => {
  return <ToolbarPrimeReact {...props} />;
};
