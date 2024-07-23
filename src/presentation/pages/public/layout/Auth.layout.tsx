import clsx from "clsx";
import { Divider, Image, Link } from "@/presentation/core/components";
import { ThemeLayout } from "@/presentation/layout";
import { GoogleAuth } from "../components";

interface Props {
  children: React.ReactNode;
  labelLink: string;
  link: string;
  label: string;
  title: string;
  showGoogleAuth: boolean;
  isDark?: boolean;
}

export const AuthLayout = ({
  children,
  labelLink,
  link,
  label,
  title,
  showGoogleAuth,
  isDark,
}: Props) => {
  return (
    <ThemeLayout
      className={clsx(
        "flex flex-col items-center justify-center",
        "max-md:py-5",
      )}
      to="auth"
      offset={-200}
      colorTheme="bg-gradient-primary dark:bg-gradient-primary-dark"
    >
      <div
        id="auth"
        className={clsx("flex w-full justify-start", "md:absolute")}
      >
        <Image
          src={clsx(isDark ? "/logo-dark.svg" : "/logo.svg")}
          width="100"
          className={clsx("mb-4 ml-10", "md:relative md:bottom-72")}
        />
      </div>
      <div
        className={clsx(
          "max-w-sm rounded-3xl bg-white/20 p-10 text-slate-900 shadow-lg backdrop-opacity-20 dark:bg-transparent dark:text-slate-300 dark:backdrop-invert dark:backdrop-opacity-10",
          "sm:w-full sm:max-w-md",
          "lg:max-w-lg",
        )}
      >
        <div className="flex justify-between">
          <span>Bienvenido</span>
          <div className="flex flex-col">
            <span className="text-sm">{label}</span>
            <Link
              to={link}
              className="text-sm text-secondary"
              label={labelLink}
              unstyled
            />
          </div>
        </div>
        <h2 className="text-4xl font-bold text-primary">{title}</h2>
        {children}
        {showGoogleAuth && (
          <>
            <Divider align="center" className="my-5">
              <h1 className="mx-2">O</h1>
            </Divider>
            <GoogleAuth />
          </>
        )}
      </div>
    </ThemeLayout>
  );
};
