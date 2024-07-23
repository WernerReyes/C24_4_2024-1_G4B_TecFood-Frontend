import { ForwardedRef, forwardRef } from "react";
import {
  type MultiSelectProps,
  MultiSelect as MultiSelectPrimeReact,
} from "primereact/multiselect";
import clsx from "clsx";

interface Props extends MultiSelectProps {
  label?: string;
  error?: boolean;
  smallDescription?: string;
}

export const MultiSelect = forwardRef<MultiSelectPrimeReact, Props>(
  (
    { label, error, smallDescription, className, ...props },
    ref: ForwardedRef<MultiSelectPrimeReact>,
  ) => {
    return (
      <div className="flex flex-col justify-center">
        {label && (
          <label className="mb-1" htmlFor={props.name}>
            {label}
          </label>
        )}
        <MultiSelectPrimeReact
          className={clsx(
            error
              ? "border-2 border-red-400 focus:border-red-400 focus:ring-1 focus:ring-red-400"
              : className,
          )}
          {...props}
          
          ref={ref}
          pt={{
            header: {
              className:
                "p-5 darkborder-b-2 border-gray-900 dark:border-blue-900/40 text-gray-700 dark:text-white/80 bg-gray-100 dark:bg-skeleton-dark rounded-t-lg flex items-center justify-between",
            },

            wrapper: {
              className: "dark:bg-slate-800",
            },
          }}
        />
        {smallDescription && error && (
          <small className="text-red-400">{smallDescription}</small>
        )}
      </div>
    );
  },
);
