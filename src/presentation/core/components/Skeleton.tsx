import {
  Skeleton as SkeletonPrimeReact,
  SkeletonProps,
} from "primereact/skeleton";

interface Props extends SkeletonProps {}

export const Skeleton = ({ ...props }: Props) => {
  return <SkeletonPrimeReact {...props} />;
};
