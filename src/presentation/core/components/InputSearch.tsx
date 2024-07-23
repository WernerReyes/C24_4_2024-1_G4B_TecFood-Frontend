import clsx from "clsx";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import type { InputTextProps } from "primereact/inputtext";
import { InputText } from "./InputText";

interface Props extends InputTextProps {
  iconPosition?: "left" | "right";
  iconClassName?: string;
}

const defaultClassName = "border border-gray-300 w-full rounded-lg p-2";

export const InputSearch = ({
  placeholder,
  type,
  className,
  unstyled,
  iconPosition = "right",
  iconClassName,
  ...props
}: Props) => {
  return (
    <>
      <IconField iconPosition={iconPosition}>
        <InputIcon
          className={clsx("pi pi-search cursor-pointer", iconClassName)}
        >
          {" "}
        </InputIcon>
        <InputText
          placeholder={placeholder}
          type={type}
          className={clsx(
            !unstyled && defaultClassName,
            iconPosition === "left" && "pl-9",
            className,
          )}
          {...props}
          unstyled={unstyled}
        />
      </IconField>
    </>
  );
};
