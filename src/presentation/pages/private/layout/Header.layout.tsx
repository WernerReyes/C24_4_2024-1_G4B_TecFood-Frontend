import { ReactNode } from "react";
import { AlertOffers } from "@/presentation/core/components";

type Props = {
  children?: ReactNode;
  scrollId?: string;
  visibleAlert?: boolean;
};

export const HeaderLayout = ({
  children,
  scrollId,
  visibleAlert = true,
}: Props) => {
  return (
    <header
      id={scrollId}
      className="sticky left-0 right-0 top-0 z-[999] flex min-h-[80px] transform  flex-col border-b  bg-white   font-[sans-serif] shadow-md backdrop-blur-md backdrop-filter transition-transform duration-500 dark:border-slate-700 dark:bg-dashboard-dark dark:text-white"
    >
      {visibleAlert && (
        <AlertOffers
          title="Get 50% off on your first order."
          subtitle="Available for April 18 - 25"
        />
      )}
      <div className="flex w-full flex-wrap items-center gap-4 p-4 py-3 sm:px-8 lg:gap-y-2">
        {children}
      </div>
    </header>
  );
};
