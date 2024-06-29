import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { type ChatMessages } from "@/model";
import { getStorage, removeStorage, setStorage } from "@/presentation/utilities";

export type OpenIASliceState = {
  isLoading: boolean;
  chatMessages: ChatMessages[];
};

export const openIASlice = createSlice({
  name: "openIA",
  initialState: {
    isLoading: false,
    chatMessages: getStorage<ChatMessages[]>("chatMessages") || [],
  },
  reducers: {
    onAddChatMessage: (state, action: PayloadAction<ChatMessages>) => {
      setStorage("chatMessages", [...state.chatMessages, action.payload]);
      return {
        ...state,
        chatMessages: [...state.chatMessages, action.payload],
        isLoading: false,
      };
    },
    onLoadChatMessages: (state, action: PayloadAction<ChatMessages[]>) => {
      return { ...state, chatMessages: action.payload, isLoading: false };
    },

    onResetChatMessages: (state) => {
      removeStorage("chatMessages");
      return { ...state, chatMessages: [], isLoading: false };
    },

    onLoadingopenIA: (state) => {
      return { ...state, isLoading: true };
    },
  },
});

export const {
  onLoadingopenIA,
  onLoadChatMessages,
  onAddChatMessage,
  onResetChatMessages,
} = openIASlice.actions;
