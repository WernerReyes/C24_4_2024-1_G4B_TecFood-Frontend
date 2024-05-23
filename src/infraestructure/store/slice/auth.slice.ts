import { User, userEmptyState } from "@/model";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export enum AuthStatus {
  CHECKING = "checking",
  AUTHENTICATE = "authenticated",
  NOT_AUTHENTICATE = "not-authenticated",
}

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    status: AuthStatus.CHECKING,
    user: userEmptyState,
  },
  reducers: {
    onCheking: (state) => {
      return { ...state, isLoading: true };
    },

    onLogin: (state, { payload }: PayloadAction<User>) => {
      return { ...state, user: payload, status: AuthStatus.AUTHENTICATE };
    },

    onLogout: (state) => {
      return {
        ...state,
        user: userEmptyState,
        status: AuthStatus.NOT_AUTHENTICATE,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { onCheking, onLogin, onLogout } = authSlice.actions;
