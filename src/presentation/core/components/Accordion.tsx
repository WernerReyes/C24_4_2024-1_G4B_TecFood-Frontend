import {
  Accordion as AccordionPrimeReact,
  AccordionProps,
} from "primereact/accordion";

interface Props extends AccordionProps {}

export const Accordion = ({ ...props }: Props) => (
  <AccordionPrimeReact {...props} />
);
