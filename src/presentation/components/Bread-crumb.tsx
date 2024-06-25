import { useEffect, useMemo } from "react";
import clsx from "clsx";
import { useLocation, useParams } from "react-router-dom";
import { BreadCrumb as BreadCrumbPrimeReact } from "primereact/breadcrumb";
import { RoleEnum } from "@/domain/entities";
import { PrivateRoutes } from "../routes";
import { fromUrlToString, routeRole } from "../utilities";
import { Link } from "./Link";
import { useDishStore, useOrderDishItemStore } from "../hooks";

interface Props {
  role: RoleEnum;
  className?: string;
  unistyled?: boolean;
}

const DEFAULT_CLASSNAME =
  "dark:bg-skeleton-dark bg-skeleton rounded-none border-none";

export const BreadCrumb = ({ role, className, unistyled }: Props) => {
  const location = useLocation();
  const { id } = useParams<{ id: string }>();
  const { orderDishId } = useParams<{ orderDishId: string }>();
  const { dish, startLoadingDishById } = useDishStore();
  // const { startLoadingOrderDishItemsByOrder } = useOrderDishItemStore();
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

  useEffect(() => {
    if (id) {
      startLoadingDishById(parseInt(id));
    }
  }, [id]);

  useEffect(() => {
    if (id && dish) {
      document.title = dish.name;
    }
  }, [dish]);

  // useEffect(() => {
  //   if (orderDishId) {
  //     startLoadingOrderDishItemsByOrder(parseInt(orderDishId));
  //   }
  // }, [orderDishId]);

  const urlSegments = useMemo(() => {
    const originalSegments = location.pathname.split("/");
    const segments = [...originalSegments]; // Copia de los segmentos originales
    const index = segments.indexOf(id!);
    if (index !== -1 && dish) {
      segments[index] = dish.name;
    }
    if (orderDishId) {
      segments[segments.length - 1] = "Order " + orderDishId;
    }

    return {
      updated: filterSegments(segments, roleRoute),
      original: originalSegments,
    };
  }, [location.pathname, roleRoute, dish]);

  const items = useMemo(() => {
    return urlSegments.updated.map((segment, index) => {
      const url = `${urlSegments.original.slice(0, index + 3).join("/")}`;
      return {
        label: segment[0].toUpperCase() + segment.slice(1),
        template: () => (
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
        ),
      };
    });
  }, [urlSegments, roleRoute, location.pathname]);

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
    .filter((segment) => segment !== "")
    .map((segment) => fromUrlToString(segment));
};
