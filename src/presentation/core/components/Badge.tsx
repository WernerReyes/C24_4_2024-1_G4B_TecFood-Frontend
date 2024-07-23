import { Badge as BadgePrimeReact, BadgeProps } from "primereact/badge";

interface Props extends BadgeProps {}

export const Badge = ({ ...props }: Props) => {
  return <BadgePrimeReact {...props} />;
};
