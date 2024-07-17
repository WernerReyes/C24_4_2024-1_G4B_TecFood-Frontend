import { forwardRef } from "react";
import clsx from "clsx";
import {
  type InputTextareaProps,
  InputTextarea as InputTextareaPrimeReact,
} from "primereact/inputtextarea";

const DEFAULT_CLASS_NAME = "border border-gray-300 w-full rounded-lg p-2";

interface Props extends InputTextareaProps {
  label?: string;
  error?: boolean;
  smallDescription?: string;
}

export const InputTextarea = forwardRef<HTMLTextAreaElement, Props>(
  ({ label, unstyled, className, error, smallDescription, ...props }, ref) => {
    return (
      <div className="flex flex-col justify-center">
        {label && (
          <label htmlFor={props.name} className="mb-1">
            {label}
          </label>
        )}
        <InputTextareaPrimeReact
          {...props}
          ref={ref}
          className={clsx(
            !unstyled && DEFAULT_CLASS_NAME,
            error
              ? "border-2 border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-400"
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
