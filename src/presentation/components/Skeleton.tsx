import clsx from "clsx";
import {
  SkeletonProps,
  Skeleton as SkeletonPrimeReact,
} from "primereact/skeleton";

interface Props extends SkeletonProps {}

export const Skeleton = ({ className, ...props }: Props) => {
  return (
    <SkeletonPrimeReact
      className={clsx("dark:bg-skeleton-dark", className)}
      {...props}
    />
  );
};
