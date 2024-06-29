import {
  ScrollPanel as ScrollPanelPrimeReact,
  type ScrollPanelProps,
} from "primereact/scrollpanel";

interface Props extends ScrollPanelProps {}

export const ScrollPanel = ({ ...props }: Props) => {
  return <ScrollPanelPrimeReact {...props} />;
};
