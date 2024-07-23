import clsx from "clsx";
import {
  type InputNumberProps,
  InputNumber as InputNumberPrimeReact,
} from "primereact/inputnumber";
import { ForwardedRef, forwardRef } from "react";

const DEFAULT_CLASS_NAME = "border border-gray-300 w-full rounded-lg p-2";

interface Props extends InputNumberProps {
  label?: string;
  error?: boolean;
  smallDescription?: string;
}

export const InputNumber = forwardRef<InputNumberPrimeReact, Props>(
  (
    { label, error, smallDescription, ...props },
    ref: ForwardedRef<InputNumberPrimeReact>,
  ) => {
    return (
      <div className="flex flex-col justify-center">
        {label && (
          <label className="mb-1" htmlFor={props.name}>
            {label}
          </label>
        )}
        <InputNumberPrimeReact
          {...props}
          className={clsx(
            !props.unstyled && DEFAULT_CLASS_NAME,
            error &&
              "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-400",

            props.className,
          )}
          ref={ref}
          pt={{
            input: {
              root: {
                className: "shadow-none ml-3",
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
