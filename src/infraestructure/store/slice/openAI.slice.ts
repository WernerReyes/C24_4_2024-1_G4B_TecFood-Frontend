import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import type { OpenAIRoleEnum } from "@/domain/entities";
import {
  StorageKeys,
  getStorage,
  removeStorage,
  setStorage,
} from "@/presentation/utilities";

const { CHAT_MESSAGES } = StorageKeys;

type Messages = {
  role: OpenAIRoleEnum;
  content: string;
};

export type OpenAISliceState = {
  isLoading: boolean;
  isAvailableChat: boolean;
  chatMessages: Messages[];
};

const initialState: OpenAISliceState = {
  isLoading: false,
  isAvailableChat: false,
  chatMessages: getStorage<Messages[]>(CHAT_MESSAGES) || [],
};

export const openAISlice = createSlice({
  name: "openIA",
  initialState,
  reducers: {
    onAddChatMessage: (state, action: PayloadAction<Messages>) => {
      setStorage(CHAT_MESSAGES, [...state.chatMessages, action.payload]);
      return {
        ...state,
        chatMessages: [...state.chatMessages, action.payload],
        isLoading: false,
      };
    },
    onLoadChatMessages: (state, action: PayloadAction<Messages[]>) => {
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
