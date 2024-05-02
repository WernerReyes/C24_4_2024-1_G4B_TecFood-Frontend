import clsx from "clsx";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import type { IconFieldProps } from "primereact/iconfield";
import { InputText } from "./Input-text";

interface Props extends IconFieldProps {}

const defaultClassName = "border border-gray-300 w-full rounded-lg p-2";

export const InputSearch = ({
  placeholder,
  type,
  className,
  unstyled,
}: Props) => {
  return (
    <>
      <IconField iconPosition="right" className={"flex w-full justify-end"}>
        <InputIcon className="pi pi-search cursor-pointer"> </InputIcon>
        <InputText
          placeholder={placeholder}
          type={type}
          className={clsx(!unstyled && defaultClassName, className)}
        />
      </IconField>
    </>
  );
};
