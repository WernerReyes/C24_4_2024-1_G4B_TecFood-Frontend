import type { NotificationRepository } from "@/domain/repositories";
import { NotificationService } from "../services";
import { SendNotificationRequest } from "@/domain/dtos";

export class NotificationRepositoryImpl implements NotificationRepository {
  constructor(private readonly notificationService: NotificationService) {}

  async sendNotification(sendNotificationRequest: SendNotificationRequest) {
    return this.notificationService.sendNotification(sendNotificationRequest);
  }

  async getAllByUser() {
    return this.notificationService.getAllByUser();
  }
}
