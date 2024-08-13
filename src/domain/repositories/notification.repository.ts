import type { NotificationModel } from "@/model";
import type { ApiResponse, SendNotificationRequest } from "../dtos";

export abstract class NotificationRepository {
  abstract sendNotification(
    request: SendNotificationRequest,
  ): Promise<ApiResponse<void>>;
  abstract getAllByUser(): Promise<ApiResponse<NotificationModel[]>>;
}
