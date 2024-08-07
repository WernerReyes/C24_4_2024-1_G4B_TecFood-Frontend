import clsx from "clsx";
import { forwardRef, useState } from "react";

interface Props {
  label?: string;
  smallDescription?: string;
  error?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  value?: string;
  inputClassName?: string;
  unstyled?: boolean;
  disabled?: boolean;
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
      ...props
    },
    ref,
  ) => {
    const [eye, setEye] = useState("pi-eye");

    const togglePassword = () => {
      setEye(eye === "pi-eye" ? "pi-eye-slash" : "pi-eye");
    };

    return (
      <div className="flex flex-col justify-center">
        {label && <label htmlFor={name}>{label}</label>}

        <div className="relative">
          <input
            id={name}
            type={clsx(eye === "pi-eye" ? "password" : "text")}
            className={clsx(
              !unstyled && defaultClassName,
              error &&
                "border-red-400 focus:border-red-400 focus:outline-none focus:ring-1 focus:ring-red-400",
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
        {smallDescription && !error && <small className="text-red-400">{smallDescription}</small>}
      </div>
    );
  },
);
