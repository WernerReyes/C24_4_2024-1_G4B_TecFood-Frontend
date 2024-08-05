import clsx from "clsx";
import {
  Calendar as CalendarPrimeReact,
  type CalendarProps,
} from "primereact/calendar";
import { forwardRef } from "react";

const DEFAULT_CLASS_NAME =
  "border border-gray-300 dark:border-gray-700 w-full rounded-lg p-2";

type Props = CalendarProps & {
  label?: string;
  error?: boolean;
  smallDescription?: string;
};

export const Calendar = forwardRef<CalendarPrimeReact, Props>(
  ({ label, error, className, smallDescription, ...props }, ref) => {
    return (
      <div className="flex flex-col justify-center">
        <label htmlFor={props.name} className="mb-1">
          {label}
        </label>
        <CalendarPrimeReact
          {...props}
          ref={ref}
          className={clsx(
            !props.unstyled && DEFAULT_CLASS_NAME,
            error
              ? "border-2  border-red-400 focus:border-red-400 focus:ring-1 focus:ring-red-400 dark:border-red-400 dark:focus:border-red-400"
              : className,
          )}
          pt={{
            ...props.pt,
            input: {
              root: {
                className: "dark:bg-slate-800",
              },
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
