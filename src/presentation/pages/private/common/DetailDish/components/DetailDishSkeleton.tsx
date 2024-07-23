import { Skeleton } from "@/presentation/core/components";

export const DetailDishSkeleton = () => {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-10">
      <div className="group mb-5 h-full lg:mb-0">
        <Skeleton height="300px" />
      </div>
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between">
          <Skeleton width="200px" height="30px" />
          <div className="flex items-center justify-between">
            <Skeleton width="100px" height="30px" />
          </div>
        </div>
        <Skeleton width="100%" className="mt-5" height="15px" />
        <Skeleton width="100%" className="mt-3" height="15px" />
        <Skeleton width="100%" className="mt-3" height="15px" />
        <div className="my-5">
          <Skeleton width="100px" height="20px" />
        </div>

        <div className="mb-5 mt-auto flex">
          <Skeleton width="100px" className="me-3" height="30px" />
          <Skeleton width="100px" height="30px" />
        </div>
        <Skeleton width="200px" height="20px" />
      </div>
    </section>
  );
};
