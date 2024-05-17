import { ReactNode } from "react";
import { Image } from "@/presentation/components";

type Props = {
  children?: ReactNode;
  isDark?: boolean;
};

export const HeaderLayout = ({ children }: Props) => {
  
  return (
    <header className="relative z-50 flex min-h-[80px] border-b bg-white px-6 py-4 font-[sans-serif] tracking-wide sm:px-8">
      <div className="flex w-full flex-wrap items-center gap-4 lg:gap-y-2">
        <Image src="/logo.svg" alt="logo" width="80" />

        {children}
      </div>
    </header>
  );
};
