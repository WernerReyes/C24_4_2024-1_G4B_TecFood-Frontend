import { CategoryNotificationEnum } from "@/domain/entities/enums";
import { generateEmptyState } from "@/presentation/utilities";
import { z } from "zod";
import { DishModelSchema, type DishModel } from "./dish.model";
import { type UserModel, UserModelSchema } from "./user.model";

export const NotificationModelSchema = z.object({
  id: z.string(),
  user: UserModelSchema,
  title: z.string(),
  details: z.string(),
  category: z.nativeEnum(CategoryNotificationEnum),
  data: z.union([DishModelSchema, UserModelSchema]),
  createdAt: z.string(),
  isRead: z.boolean(),
});

export type NotificationModel = z.infer<typeof NotificationModelSchema>;

export type NotificationData = DishModel | UserModel;
/*  <== ( STRUCTURE ) ==>
export const notificationEmptyState: NotificationModel = {
  id: "",
  userId: 0,
  message: "",
  details: {} as NotificacionDetails,
  category: "" as CategoryNotificationEnum,
  createdAt: "",
  isRead: false,
};
*/

export const notificationEmptyState = generateEmptyState<NotificationModel>(
  NotificationModelSchema,
);
