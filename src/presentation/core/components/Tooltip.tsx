import { TooltipProps, Tooltip as TooltipPrimeReact } from "primereact/tooltip";

interface Props extends TooltipProps {}

export const Tooltip = ({ ...pros }: Props) => {
  return <TooltipPrimeReact {...pros} />;
};
