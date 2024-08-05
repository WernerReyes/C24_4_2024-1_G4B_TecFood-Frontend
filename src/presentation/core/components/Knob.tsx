import clsx from "clsx";
import { type KnobProps, Knob as KnobPrimeReact } from "primereact/knob";

interface Props extends KnobProps {
  label?: string;
  labelClassName?: string;
}
export const Knob = ({ label, labelClassName, ...props }: Props) => {
  return (
    <div  className="flex items-center flex-col">
      {label && (
        <label htmlFor={props.name} className={clsx(labelClassName, "mb-1")}>
          {label}
        </label>
      )}
      <KnobPrimeReact {...props} />
    </div >
  );
};
