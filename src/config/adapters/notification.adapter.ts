import type { NotificationEntity } from "@/domain/entities";
import type { NotificationModel } from "@/model";
import { convertDateToShortString } from "../../presentation/utilities";
import { userAdapter } from "./user.adapter";

export const notificationAdapter = (
  notificationEntity: NotificationEntity,
): NotificationModel => {
  return {
    id: notificationEntity.id,
    user: userAdapter(notificationEntity.user),
    title: notificationEntity.title,
    details: notificationEntity.details,
    category: notificationEntity.category,
    data: JSON.parse(notificationEntity.data),
    createdAt: convertDateToShortString(notificationEntity.createdAt),
    isRead: notificationEntity.isRead,
  };
};
