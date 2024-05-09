import { forwardRef, useEffect } from "react";
import clsx from "clsx";
import { InputText as InputTextPrimeReact } from "primereact/inputtext";
import type { InputTextProps } from "primereact/inputtext";
import { SonnerManager } from "@/presentation/utilities";

interface Props extends InputTextProps {
  label?: string;
  smallDescription?: string;
  error?: string;
  showAlertError?: boolean;
}

const defaultClassName = "border border-gray-300 w-full rounded-lg p-2";

export const InputText = forwardRef<HTMLInputElement, Props>(
  (
    {
      label,
      smallDescription,
      unstyled,
      className,
      error,
      showAlertError,
      ...props
    },
    ref,
  ) => {
    useEffect(() => {
      if (error && showAlertError) {
        SonnerManager.error(error);
      }
    }, [error, showAlertError]);

    return (
      <div className="flex flex-col justify-center">
        {label && <label htmlFor="username">{label}</label>}
        <InputTextPrimeReact
          {...props}
          ref={ref}
          className={clsx(
            !unstyled && defaultClassName,
            error && "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-400",
            className,
          )}
        />
        {smallDescription && !error && <small>{smallDescription}</small>}
        {error && !showAlertError && (
          <small className="text-red-500">{error}</small>
        )}
      </div>
    );
  },
);
