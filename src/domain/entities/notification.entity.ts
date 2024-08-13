import type { CategoryNotificationEnum } from "./enums";
import { UserEntity } from "./user.entity";

export interface NotificationEntity {
  readonly id: string;
  readonly user: UserEntity;
  readonly title: string;
  readonly details: string;
  readonly category: CategoryNotificationEnum;
  readonly data: string;
  readonly createdAt: Date;
  readonly isRead: boolean;
}
