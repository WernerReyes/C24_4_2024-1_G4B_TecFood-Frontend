import clsx from "clsx";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import type { InputTextProps } from "primereact/inputtext";
import { InputText } from "./Input-text";

interface Props extends InputTextProps {}

const defaultClassName = "border border-gray-300 w-full rounded-lg p-2";

export const InputSearch = ({
  placeholder,
  type,
  className,
  unstyled,
  ...props
}: Props) => {
  return (
    <>
      <IconField iconPosition="right" className={"flex w-full justify-end"}>
        <InputIcon className="pi pi-search cursor-pointer"> </InputIcon>
        <InputText
          placeholder={placeholder}
          type={type}
          className={clsx(!unstyled && defaultClassName, className)}
          {...props}
        />
      </IconField>
    </>
  );
};
