import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { type ChatMessages } from "@/model";
import {
  StorageKeys,
  getStorage,
  removeStorage,
  setStorage,
} from "@/presentation/utilities";

const { CHAT_MESSAGES } = StorageKeys;

export type OpenIASliceState = {
  isLoading: boolean;
  isAvailableChat: boolean;
  chatMessages: ChatMessages[];
};

export const openIASlice = createSlice({
  name: "openIA",
  initialState: {
    isLoading: false,
    isAvailableChat: false,
    chatMessages: getStorage<ChatMessages[]>(CHAT_MESSAGES) || [],
  },
  reducers: {
    onAddChatMessage: (state, action: PayloadAction<ChatMessages>) => {
      setStorage(CHAT_MESSAGES, [...state.chatMessages, action.payload]);
      return {
        ...state,
        chatMessages: [...state.chatMessages, action.payload],
        isLoading: false,
      };
    },
    onLoadChatMessages: (state, action: PayloadAction<ChatMessages[]>) => {
      return { ...state, chatMessages: action.payload, isLoading: false };
    },

    onSetAvailableChat: (state) => {
      return { ...state, isAvailableChat: true };
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
  onSetAvailableChat,
  onAddChatMessage,
  onResetChatMessages,
} = openIASlice.actions;
