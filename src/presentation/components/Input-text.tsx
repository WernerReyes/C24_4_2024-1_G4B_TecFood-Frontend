import { forwardRef } from "react";
import clsx from "clsx";
import { InputText as InputTextPrimeReact } from "primereact/inputtext";
import type { InputTextProps } from "primereact/inputtext";

interface Props extends InputTextProps {
  label?: string;
  smallDescription?: string;
  error?: string;
}

const defaultClassName = "border border-gray-300 w-full rounded-lg p-2";

export const InputText = forwardRef<HTMLInputElement, Props>(
  ({ label, smallDescription, unstyled, className, error, ...props }, ref) => {
    return (
      <div className="flex flex-col justify-center">
        {label && <label htmlFor="username">{label}</label>}
        <InputTextPrimeReact
          {...props}
          ref={ref}
          className={clsx(
            !unstyled && defaultClassName,
            error ? "border-2 border-red-500" : className
          )}
        />
        {smallDescription && !error && <small>{smallDescription}</small>}
        {error && <small className="text-red-500">{error}</small>}
      </div>
    );
  },
);
