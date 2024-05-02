import { useState } from "react";
import { Button as ButtonPrimeReact } from "primereact/button";
import { ButtonGroup as ButtonGroupPrimeReact } from "primereact/buttongroup";
import type { ButtonProps } from "primereact/button";
import clsx from "clsx";

interface Props extends ButtonProps {
  time?: number;
}
const defaultClassName = "px-4 py-2 text-black rounded-full bg-primary";

export const Button = ({
  children,
  color = "primary",
  className,
  loading,
  onClick,
  time,
  ...props
}: Props) => {
  const [loadingReq, setLoadingReq] = useState<boolean>(false);

  const load = () => {
    setLoadingReq(true);
    setTimeout(() => setLoadingReq(false), time);
  };

  return (
    <div className="card flex flex-wrap justify-center">
      <ButtonPrimeReact
        onClick={loading ? load : onClick}
        loading={loadingReq}
        className={clsx(!props.unstyled && defaultClassName, className)}
        {...props}
      >
        {children}
      </ButtonPrimeReact>
    </div>
  );
};

export const ButtonGroup = ({ children }: Props) => {
  return <ButtonGroupPrimeReact>{children}</ButtonGroupPrimeReact>;
};
