import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export const enum TypeMessage {
  SUCCESS = "success",
  ERROR = "error",
  WARNING = "warning",
  INFO = "info",
}

export type MessageSliceState = {
  type: TypeMessage;
  messages: string[];
};

export const messageSlice = createSlice({
  name: "message",
  initialState: {
    type: "" as TypeMessage,
    messages: [] as string[],
  },
  reducers: {
    setMessages: (
      state,
      action: PayloadAction<{ type: TypeMessage; messages: string[] }>,
    ) => {
      return { ...state, ...action.payload };
    },

    clearMessages: (state) => {
      return { ...state, message: [] };
    },
  },
});

export const { setMessages, clearMessages } = messageSlice.actions;
