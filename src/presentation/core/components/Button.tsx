import { Button as ButtonPrimeReact } from "primereact/button";
import { ButtonGroup as ButtonGroupPrimeReact } from "primereact/buttongroup";
import type { ButtonProps } from "primereact/button";
import clsx from "clsx";

interface Props extends ButtonProps {
  time?: number;
  isLoading?: boolean;
}
const defaultClassName = "px-4 py-2 text-black rounded-full bg-primary";

export const Button = ({
  children,
  className,
  isLoading,
  onClick,
  ...props
}: Props) => {
  return (
    <div className="card flex flex-wrap justify-center">
      <ButtonPrimeReact
        onClick={onClick}
        loading={isLoading}
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
