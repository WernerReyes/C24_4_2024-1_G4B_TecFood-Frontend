import { CategoryNotificationEnum } from "@/domain/entities/enums";
import { notificationEmptyState, type NotificationModel } from "@/model";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type NotificationSliceState = {
  notifications: NotificationModel[];
  notification: NotificationModel;
  category: CategoryNotificationEnum;
};

const initialState: NotificationSliceState = {
  notifications: [],
  notification: notificationEmptyState,
  category: "" as CategoryNotificationEnum,
};

export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    onLoadNotification: (state, action: PayloadAction<NotificationModel>) => {
      return {
        ...state,
        notification: action.payload,
        category: action.payload.category,
      };
    },

    onLoadNotifications: (
      state,
      action: PayloadAction<NotificationModel[]>,
    ) => {
      return {
        ...state,
        notifications: action.payload,
      };
    },

    onResetNotification: () => {
      return { ...initialState };
    },
  },
});

export const { onLoadNotification, onLoadNotifications, onResetNotification } =
  notificationSlice.actions;
