import {
  type IconFieldProps as IconFieldPropsPrimeReact,
  IconField as IconFieldPrimeReact,
} from "primereact/iconfield";
import {
  type InputIconProps as InputsIconPropsPrimeReact,
  InputIcon as InputIconPrimeReact,
} from "primereact/inputicon";

interface IconFieldProps extends IconFieldPropsPrimeReact {}

export const IconField = ({ ...props }: IconFieldProps) => {
  return <IconFieldPrimeReact {...props} />;
};

interface InputIconProps extends InputsIconPropsPrimeReact {}

export const InputIcon = ({ ...props }: InputIconProps) => {
  return <InputIconPrimeReact {...props} />;
};
