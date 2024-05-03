import { User, userEmptyState } from "@/model";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoading: true,
    user: userEmptyState,
    errorMessage: undefined as string | undefined,
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

    setErrorMessage: (state, { payload }: PayloadAction<string>) => {
      return { ...state, errorMessage: payload, isLoading: false };
    },

    clearErrorMessage: (state) => {
      state.errorMessage = undefined;
    },
  },
});

// Action creators are generated for each case reducer function
export const { onCheking, onLogin, onLogout, clearErrorMessage } =
  authSlice.actions;
