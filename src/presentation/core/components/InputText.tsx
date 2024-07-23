import clsx from "clsx";
import { forwardRef } from "react";
import type { InputTextProps } from "primereact/inputtext";
import { InputText as InputTextPrimeReact } from "primereact/inputtext";

interface Props extends InputTextProps {
  label?: string;
  smallDescription?: string;
  error?: boolean;
}

const DEFAULT_CLASS_NAME = "border border-gray-300 w-full rounded-lg p-2";

export const InputText = forwardRef<HTMLInputElement, Props>(
  ({ label, smallDescription, unstyled, className, error, ...props }, ref) => {
    return (
      <div className="flex flex-col justify-center">
        {label && (
          <label htmlFor={props.name} className="mb-1">
            {label}
          </label>
        )}
        <InputTextPrimeReact
          {...props}
          ref={ref}
          unstyled={unstyled}
          className={clsx(
            !unstyled && DEFAULT_CLASS_NAME,
            error
              ? "border-2 border-red-400 focus:border-red-400 focus:ring-1 focus:ring-red-400"
              : className,
          )}
        />
        {smallDescription && error && (
          <small className="text-red-400">{smallDescription}</small>
        )}
      </div>
    );
  },
);
