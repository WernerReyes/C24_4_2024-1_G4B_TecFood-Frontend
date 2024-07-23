import clsx from "clsx";
import {
  RadioButton as RadioButtonPrimeReact,
  type RadioButtonChangeEvent as RadioButtonChangeEventPrimeReact,
  type RadioButtonProps,
} from "primereact/radiobutton";

export interface RadioButtonChangeEvent
  extends RadioButtonChangeEventPrimeReact {}

interface Props extends RadioButtonProps {}

export const RadioButton = ({ ...props }: Props) => {
  return (
    <RadioButtonPrimeReact
      {...props}
      pt={{
        ...props.pt,
        box: () => ({
          className: clsx(
            "border-2 border-skeleton dark:border-skeleton-dark duration-200",
            {
              "bg-primary border-none": props.checked,
            },
          ),
        }),
      }}
    />
  );
};
