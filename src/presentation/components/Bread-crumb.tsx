import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { BreadCrumb as BreadCrumbPrimeReact } from "primereact/breadcrumb";
import { RoleEnum } from "@/domain/entities";
import { PrivateRoutes } from "../routes";
import { routeRole } from "../utilities";
import clsx from "clsx";
import { Link } from "./Link";

interface Props {
  role: RoleEnum;
  className?: string;
  unistyled?: boolean;
}

const DEFAULT_CLASSNAME = "dark:bg-skeleton-dark bg-skeleton rounded-none border-none";

export const BreadCrumb = ({ role, className, unistyled }: Props) => {
  const location = useLocation();
  const roleRoute = PrivateRoutes[routeRole(role)].toString();

  const home = {
    template: () => (
      <Link
        unstyled
        to={`${roleRoute}/home`}
        className="text-black dark:text-white"
      >
        <i
          className={clsx(
            "pi pi-home",
            location.pathname === `${roleRoute}/home`
              ? "text-primary"
              : "text-black dark:text-white",
          )}
        ></i>
      </Link>
    ),
  };

  const urlSegments = useMemo(() => {
    const segments = location.pathname.split("/");
    return filterSegments(segments, roleRoute);
  }, [location.pathname, roleRoute]);

  const items = useMemo(() => {
    return urlSegments.map((segment, index, array) => {
      const url = `${roleRoute}/${array.slice(0, index + 1).join("/")}`;
      return {
        label: segment[0].toUpperCase() + segment.slice(1),
        template: () => {
          return (
            <Link
              unstyled
              to={url}
              className={clsx(
                location.pathname === url
                  ? "text-primary"
                  : "text-black dark:text-white",
              )}
            >
              {segment[0].toUpperCase() + segment.slice(1)}
            </Link>
          );
        },
        className: "cursor-pointer",
      };
    });
  }, [urlSegments, roleRoute]);

  return (
    <BreadCrumbPrimeReact
      home={home}
      model={items}
      unstyled={unistyled}
      className={clsx(!unistyled && DEFAULT_CLASSNAME, className)}
    />
  );
};

const filterSegments = (segments: string[], roleRoute: string) => {
  return segments
    .filter((segment) => `/${segment}` !== roleRoute && segment !== "home")
    .filter((segment) => segment !== "");
};
