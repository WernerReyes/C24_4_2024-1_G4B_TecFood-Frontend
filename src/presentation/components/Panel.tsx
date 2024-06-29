import {
  Panel as PanelPrimeReact,
  type PanelProps,
  type PanelHeaderTemplateOptions as PanelHeaderTemplateOptionsPrimeReact,
  type PanelFooterTemplateOptions as PanelFooterTemplateOptionsPrimeReact,
} from "primereact/panel";

export interface PanelHeaderTemplateOptions extends PanelHeaderTemplateOptionsPrimeReact {}

export interface PanelFooterTemplateOptions
  extends PanelFooterTemplateOptionsPrimeReact {}

interface Props extends PanelProps {}

export const Panel = ({ ...props }: Props) => {
  return <PanelPrimeReact {...props} />;
};
