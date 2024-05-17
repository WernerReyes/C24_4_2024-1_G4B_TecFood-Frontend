import { ChangeTheme } from "@/presentation/components";
import clsx from "clsx";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  to?: string;
  offset?: number;
  duration?: number;
  showIconTheme?: boolean;
  className?: string;
};

export const ThemeLayout = ({
  children,
  showIconTheme = true,
  className,
  to = "",
  offset = 50,
  duration = 700,
}: Props) => {
  return (
    <main
      className={clsx(
        "h-full max-h-full min-h-screen w-full bg-gradient-primary dark:bg-gradient-primary-dark",
        className,
      )}
    >
      {children}
      {showIconTheme && (
        <ChangeTheme to={to} offset={offset} duration={duration} />
      )}
    </main>
  );
};
