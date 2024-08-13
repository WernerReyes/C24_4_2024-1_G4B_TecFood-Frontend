import { notificationAdapter } from "@/config/adapters";
import { httpRequest } from "@/config/api";
import { ApiResponse, type SendNotificationRequest } from "@/domain/dtos";
import type { NotificationEntity } from "@/domain/entities";
import type { NotificationModel } from "@/model";

interface INotificationService {
  sendNotification(
    sendNotificationRequest: SendNotificationRequest,
  ): Promise<ApiResponse<void>>;
  getAllByUser(): Promise<ApiResponse<NotificationModel[]>>;
}

export class NotificationService implements INotificationService {
  private readonly prefix: string;
  constructor() {
    this.prefix = "/notification";
  }
  public async sendNotification(
    sendNotificationRequest: SendNotificationRequest,
  ) {
    try {
      return await httpRequest.post<void>(
        this.prefix + "/send",
        sendNotificationRequest.toRequestBody,
      );
    } catch (error) {
      throw error;
    }
  }

  public async getAllByUser() {
    try {
      const { data, ...rest } = await httpRequest.get<NotificationEntity[]>(
        this.prefix + "/user",
      );
      return {
        data: data.map((notification) => notificationAdapter(notification)),
        ...rest,
      };
    } catch (error) {
      throw error;
    }
  }
}
