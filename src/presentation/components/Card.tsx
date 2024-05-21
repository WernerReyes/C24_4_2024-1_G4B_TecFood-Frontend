import clsx from "clsx";
import { Card as CardPrimerReact } from "primereact/card";
import type { CardProps } from "primereact/card";
import { Skeleton } from "./Skeleton";

interface Props extends CardProps {}

export const Card = (props: Props) => {
  return <CardPrimerReact {...props} />;
};

interface CardSkeletonProps {
  className?: string;
}

export const CardSkeleton = ({ className }: CardSkeletonProps) => {
  return (
    <div
      className={clsx(
        "surface-border surface-card rounded-md border p-4 dark:border-slate-700",
        className,
      )}
    >
      <div className="mb-3 flex">
        <Skeleton shape="circle" size="4rem" className="mr-2"></Skeleton>
        <div>
          <Skeleton width="10rem" className="mb-2"></Skeleton>
          <Skeleton width="5rem" className="mb-2"></Skeleton>
          <Skeleton height=".5rem"></Skeleton>
        </div>
      </div>
      <Skeleton width="100%" height="150px"></Skeleton>
      <div className="mt-3 flex justify-between">
        <Skeleton width="4rem" height="2rem"></Skeleton>
        <Skeleton width="4rem" height="2rem"></Skeleton>
      </div>
    </div>
  );
};
