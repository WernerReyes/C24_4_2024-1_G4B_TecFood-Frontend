import clsx from "clsx";
import {
    CheckboxChangeEvent as CheckboxChangeEventPrimeReact,
    CheckboxPassThroughMethodOptions,
    Checkbox as CheckboxPrimeReact,
    CheckboxProps
} from "primereact/checkbox";

export interface CheckboxChangeEvent extends CheckboxChangeEventPrimeReact {}

interface Props extends CheckboxProps {}

export const Checkbox = ({ ...props }: Props) => {
  return (
    <CheckboxPrimeReact
      {...props}
      pt={{
        box: ({ context }: CheckboxPassThroughMethodOptions) => ({
          className: clsx(
            "flex items-center justify-center",
            "border-2 w-6 h-6 text-gray-600 rounded-lg transition-colors duration-200",
            {
              "border-gray-300 bg-white dark:border-primary-dark/40 dark:bg-gray-900":
                !context.checked,
              "border-primary bg-primary dark:border-primary dark:bg-primary":
                context.checked,
            },
          ),
        }),
      }}
    />
  );
};
