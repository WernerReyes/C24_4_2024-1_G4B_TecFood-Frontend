import clsx from "clsx";
import { Badge, Menu } from "@/presentation/core/components";
import { useNotificationStore } from "@/presentation/hooks";
import { useEffect, useState } from "react";
import { NotificationCard } from "../../components";
import type { DishModel } from "@/model";
import { PrivateRoutes } from "@/presentation/routes";
import { RoleEnum } from "@/domain/entities";

const {
  common: { DETAIL_DISH },
} = PrivateRoutes;

export const NotificationPreview = () => {
  const { startLoadNotificationsByUser, notifications } =
    useNotificationStore();
  const [showMenu, setShowMenu] = useState<boolean>(false);

  useEffect(() => {
    startLoadNotificationsByUser();
  }, []);

  return (
    <div className="relative">
      <i
        onClick={() => setShowMenu(!showMenu)}
        className="pi pi-bell p-overlay-badge cursor-pointer text-2xl text-black dark:text-white"
      >
        <Badge
          value={notifications.length}
          className="bg-primary text-white"
          size="normal"
        />
      </i>
      <Menu
        id="popup_menu_left"
        model={[
          ...notifications.map((notification) => ({
            template: () => (
              <NotificationCard
                size="small"
                title={notification.title}
                details={notification.details}
                imageUrl={(notification.data as DishModel).images[0].url}
                date={notification.createdAt}
                link={DETAIL_DISH(RoleEnum.ROLE_USER, notification.data.id)}
                category={notification.category}
              />
            ),
          })),
          {
            template: () => (
              <div className="fixed -bottom-52 flex w-[19.6rem] cursor-pointer justify-center bg-skeleton dark:bg-slate-700">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  View all notifications
                </span>
              </div>
            ),
          },
        ]}
        aria-controls="popup_menu_left"
        popupAlignment="left"
        className={clsx(
          !showMenu ? "hidden" : "fixed",
          "right-32 max-h-60 w-80 overflow-y-auto",
        )}
      />
    </div>
  );
};
