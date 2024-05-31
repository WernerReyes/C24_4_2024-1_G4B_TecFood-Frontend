import clsx from "clsx";
import { ProgressSpinner as ProgressSpinnerPrimerReact } from "primereact/progressspinner";
import type { ProgressSpinnerProps } from "primereact/progressspinner";
import { useTheme } from "../hooks";

interface Props extends ProgressSpinnerProps {
  containerClassName?: string;
  darkColor?: string;
  lightColor?: string;
}

export const ProgressSpinner = ({
  containerClassName,
  darkColor,
  lightColor,
  ...props
}: Props) => {
  const { isDark } = useTheme();
  return (
    <div
      className={clsx(
        "flex h-full max-h-full min-h-screen w-full items-center justify-center",
        containerClassName,
        isDark ? darkColor : lightColor,
      )}
    >
      <ProgressSpinnerPrimerReact {...props} />
    </div>
  );
};
