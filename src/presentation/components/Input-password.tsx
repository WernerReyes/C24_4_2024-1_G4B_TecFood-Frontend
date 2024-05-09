import clsx from "clsx";
import { SonnerManager } from "@/presentation/utilities";
import { forwardRef, useEffect, useState } from "react";

interface Props  {
  label?: string;
  smallDescription?: string;
  error?: string;
  showAlertError?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  value?: string;
  inputClassName?: string;
  unstyled?: boolean;
  disabled?: boolean;
  // ref?: React.ForwardedRef<HTMLInputElement>;
  name: string;
  placeholder?: string;
}

const defaultClassName = "border border-gray-300 w-full rounded-lg p-2";

export const InputPassword = forwardRef<HTMLInputElement, Props>(
  (
    {
      unstyled,
      inputClassName,
      label,
      name,
      error,
      smallDescription,
      showAlertError,
      ...props
    },
    ref,
  ) => {
    const [eye, setEye] = useState("pi-eye");

    const togglePassword = () => {
      setEye(eye === "pi-eye" ? "pi-eye-slash" : "pi-eye");
    };

    useEffect(() => {
      if (error && showAlertError) {
        SonnerManager.error(error);
      }
    }, [error, showAlertError]);
    return (
      <div className="flex flex-col justify-center">
        {label && <label htmlFor={name}>{label}</label>}

        <div className="relative">
          <input
            id={name}
            type={clsx(eye === "pi-eye" ? "password" : "text")}
            className={clsx(
              !unstyled && defaultClassName,
              error && "border-red-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-400",
              inputClassName,
            )}
            ref={ref}
            name={name}
            {...props}
          />
          <button
            type="button"
            className="absolute end-0 top-[-2px] rounded-e-md p-3.5"
            onClick={togglePassword}
          >
            <i className={clsx("pi", eye)}></i>
          </button>
        </div>
        {smallDescription && !error && <small>{smallDescription}</small>}
        {error && !showAlertError && (
          <small className="text-red-500">{error}</small>
        )}
      </div>
    );
  },
);
