import { forwardRef, useEffect } from "react";
import clsx from "clsx";
import { Password } from "primereact/password";
import type { PasswordProps } from "primereact/password";
import { SonnerManager } from "@/presentation/utilities";

interface Props extends PasswordProps {
  label?: string;
  smallDescription?: string;
  error?: string;
  showAlertError?: boolean;
}

const defaultClassName = "border border-gray-300 w-full rounded-lg p-2";

export const InputPassword = forwardRef<Password, Props>(
  (
    {
      unstyled,
      inputClassName,
      className,
      label,
      name,
      pt,
      error,
      smallDescription,
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
        {label && <label htmlFor={name}>{label}</label>}
        <Password
          inputClassName={clsx(
            !unstyled && defaultClassName,
            error && "border-red-500",
            inputClassName,
          )}
          className={clsx(
            !unstyled && "flex w-full justify-end",
            className,
          )}
          pt={{
            showIcon: { className: "me-4" },
            hideIcon: { className: "me-4" },
            info: { className: "hidden" },
            ...pt,
          }}
          ref={ref}
          header={header}
          footer={footer}
          {...props}
        />
        {smallDescription && !error && <small>{smallDescription}</small>}
        {error && !showAlertError && (
          <small className="text-red-500">{error}</small>
        )}
      </div>
    );
  },
);

const header = <div className="mt-3 font-bold">Pick a password</div>;

const footer = (
  <>
    <p className="mt-2">Suggestions</p>
    <ul className="line-height-3 ml-2 mt-0 pl-2">
      <li>At least one lowercase</li>
      <li>At least one uppercase</li>
      <li>At least one numeric</li>
      <li>Minimum 8 characters</li>
    </ul>
  </>
);


