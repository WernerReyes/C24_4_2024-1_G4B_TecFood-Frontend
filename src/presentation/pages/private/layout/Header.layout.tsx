import { ReactNode } from "react";
import { AlertOffers, Image } from "@/presentation/components";
import { useTheme } from "@/presentation/hooks";

type Props = {
  children?: ReactNode;
  scrollId?: string;
};

export const HeaderLayout = ({ children, scrollId }: Props) => {
  const { isDark } = useTheme();
  return (
    <header
      id={scrollId}
      className="sticky left-0 right-0 top-0 z-50 flex min-h-[80px] transform  flex-col border-b  bg-white   font-[sans-serif] shadow-md backdrop-blur-md backdrop-filter transition-transform duration-500 dark:border-slate-700 dark:bg-dashboard-dark dark:text-white"
    
      // className="tracking-wided relative  z-50 flex min-h-[80px] flex-col border-b bg-white font-[sans-serif] dark:border-slate-700 dark:bg-dashboard-dark dark:text-white"
    >
      <AlertOffers
        title="Get 50% off on your first order."
        subtitle="Available for April 18 - 25"
      />
      <div className="flex w-full flex-wrap items-center gap-4 p-4 py-3 sm:px-8 lg:gap-y-2">
        <Image
          src={isDark ? "/logo-dark.svg" : "/logo.svg"}
          alt="logo"
          width="80"
        />
        {children}
      </div>
    </header>
  );
};
