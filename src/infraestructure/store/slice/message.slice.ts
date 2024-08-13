import type { ApiResponseStatus } from "@/domain/dtos";
import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

export type MessageSliceState = {
  type: ApiResponseStatus;
  messages: string[];
};

const initialState: MessageSliceState = {
  type: "" as ApiResponseStatus,
  messages: [],
};

export const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setMessages: (
      state,
      action: PayloadAction<{ type: ApiResponseStatus; messages: string[] }>,
    ) => {
      return { ...state, ...action.payload };
    },

    clearMessages: (state) => {
      return { ...state, message: [] };
    },
  },
});

export const { setMessages, clearMessages } = messageSlice.actions;
