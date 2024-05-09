import { User, userEmptyState } from "@/model";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoading: false,
    user: userEmptyState,
    message: undefined as string | undefined,
  },
  reducers: {
    onCheking: (state) => {
      return { ...state, isLoading: true };
    },

    onLogin: (state, { payload }: PayloadAction<User>) => {
      return { ...state, user: payload, isLoading: false };
    },

    onLogout: (state) => {
      return { ...state, user: userEmptyState, isLoading: false };
    },

    setMessages: (state, { payload }: PayloadAction<string>) => {
      return { ...state, message: payload, isLoading: false };
    },

    clearMessages: (state) => {
      return { ...state, message: undefined, errorMessage: undefined };
    },

  },
});

// Action creators are generated for each case reducer function
export const { onCheking, onLogin, onLogout, setMessages, clearMessages } =
  authSlice.actions;
