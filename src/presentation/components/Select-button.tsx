import clsx from "clsx";
import {
  type SelectButtonProps,
  SelectButton as SelectButtonPrimeReact,
  type SelectButtonChangeEvent as SelectButtonChangeEventPrimeReact,
  type SelectButtonPassThroughMethodOptions,
} from "primereact/selectbutton";

export interface SelectButtonChangeEvent extends SelectButtonChangeEventPrimeReact {};

interface Props extends SelectButtonProps {};

export const SelectButton = ({ ...props }: Props) => {
  return (
    <SelectButtonPrimeReact
      {...props}
      pt={{
        ...props.pt,
        button: ({ context }: SelectButtonPassThroughMethodOptions) => ({
          className: clsx(
            "inline-flex cursor-pointer select-none items-center align-bottom text-[10px] md:text-md text-center overflow-hidden relative",
            "px-4 py-3",
            "transition duration-200 border border-r-0",
            "first:rounded-l-md first:rounded-tr-none first:rounded-br-none last:border-r last:rounded-tl-none last:rounded-bl-none last:rounded-r-md",
            "focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)] dark:focus:shadow-[0_0_0_0.2rem_rgba(147,197,253,0.5)]",
            {
              "bg-white dark:bg-gray-900 text-gray-700 dark:text-white/80 border-gray-300 dark:border-blue-900/40 hover:bg-gray-50 dark:hover:bg-gray-800/80 ":
                !context.selected,
              "bg-primary border-primary text-white hover:bg-primary-dark":
                context.selected,
              "opacity-60 select-none pointer-events-none cursor-default":
                context.disabled,
            },
          ),
        }),
      }}
    />
  );
};
