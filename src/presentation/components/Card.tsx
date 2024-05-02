import { Card as CardPrimerReact } from "primereact/card";
import type { CardProps } from "primereact/card";

interface Props extends CardProps {}

export const Card = (props: Props) => {
  return <CardPrimerReact {...props} />;
};
