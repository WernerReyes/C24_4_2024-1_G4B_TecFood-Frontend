import type { Message } from "@/domain/dtos";
import {
  StorageKeys,
  getStorage,
  removeStorage,
  setStorage,
} from "@/presentation/utilities";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const { CHAT_MESSAGES } = StorageKeys;


export type OpenAISliceState = {
  isLoading: boolean;
  isAvailableChat: boolean;
  chatMessages: Message[];
};

const initialState: OpenAISliceState = {
  isLoading: false,
  isAvailableChat: false,
  chatMessages: getStorage<Message[]>(CHAT_MESSAGES) || [],
};

export const openAISlice = createSlice({
  name: "openIA",
  initialState,
  reducers: {
    onAddChatMessage: (state, action: PayloadAction<Message>) => {
      setStorage(CHAT_MESSAGES, [...state.chatMessages, action.payload]);
      return {
        ...state,
        chatMessages: [...state.chatMessages, action.payload],
        isLoading: false,
      };
    },
    onLoadChatMessages: (state, action: PayloadAction<Message[]>) => {
      return { ...state, chatMessages: action.payload, isLoading: false };
    },

    onSetAvailableChat: (state) => {
      return { ...state, isAvailableChat: true };
    },

    onResetChatMessages: () => {
      removeStorage(CHAT_MESSAGES);
      return { ...initialState, chatMessages: [] };
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
} = openAISlice.actions;
