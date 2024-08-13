import {
  ApiResponse,
  SendNotificationRequest,
} from "@/domain/dtos";
import { NotificationRepositoryImpl } from "@/infraestructure/repositories";
import {
  NotificationService,
  WebSocketService,
} from "@/infraestructure/services";
import {
  onLoadNotifications,
  onResetNotification,
  type AppState,
} from "@/infraestructure/store";
import { useDispatch, useSelector } from "react-redux";
import { useMessageStore } from "./useMessageStore";
import { useEffect, useState } from "react";
import { NotificationEntity } from "@/domain/entities";
import { notificationAdapter } from "@/config/adapters";
import { Message } from "@stomp/stompjs";

const webSocketService = new WebSocketService();

const notificationService = new NotificationService();
const notificationRespositoryImpl = new NotificationRepositoryImpl(
  notificationService,
);

export const useNotificationStore = () => {
  const { notifications, category, notification } = useSelector(
    (state: AppState) => state.notification,
  );
  const { startSetMessagesSuccess } = useMessageStore();
  const dispatch = useDispatch();
  const [websoketConnected, setWebsocketConnected] = useState(false);
  const [getNotification, setGetNotification] = useState(false);

  useEffect(() => {
    webSocketService.connect();
    setWebsocketConnected(true);

    return () => {
      webSocketService.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!websoketConnected) return;
    //* Subscribe to global notification
    const handleGlobalNotification = (notifications: Message) => {
      const body = JSON.parse(notifications.body);
      console.log(body);
      // dispatch(onLoadNotifications(notificationAdapter())));
    };

    //* Subscribe to specific user notification
    const handleUserNotification = (notification: Message) => {
      const { data } = JSON.parse(
        notification.body,
      ) as ApiResponse<NotificationEntity>;
      dispatch(
        onLoadNotifications([notificationAdapter(data), ...notifications]),
      );
    };

    webSocketService.subscribe(
      "/topic/notifications",
      handleGlobalNotification,
    );
    webSocketService.subscribe(
      "/user/queue/notifications",
      handleUserNotification,
    );

    return () => {
      webSocketService.unsubscribe("/topic/notifications");
      webSocketService.unsubscribe("/user/queue/notifications");
      getNotification && setGetNotification(false);
    };
  }, [websoketConnected, getNotification]);

  const startSendingNotification = async (
    sendNotificationRequest: SendNotificationRequest,
  ) => {
    await notificationRespositoryImpl
      .sendNotification(sendNotificationRequest)
      .then(({ message }) => {
        startSetMessagesSuccess([message]);
        setGetNotification(true);
      });
  };

  const startLoadNotificationsByUser = async () => {
    await notificationRespositoryImpl.getAllByUser().then(({ data }) => {
      dispatch(onLoadNotifications(data));
    });
  };

  const startResetNotification = () => {
    dispatch(onResetNotification());
  };

  return {
    //* Atributes
    notifications,
    notification,
    category,

    //* Funtions
    startSendingNotification,
    startLoadNotificationsByUser,
    startResetNotification,
  };
};
