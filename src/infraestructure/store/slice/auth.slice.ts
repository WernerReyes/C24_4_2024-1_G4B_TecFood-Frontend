import { UserState, userEmptyState } from "@/model";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export enum AuthStatus {
  CHECKING = "checking",
  AUTHENTICATE = "authenticated",
  NOT_AUTHENTICATE = "not-authenticated",
}

export type AuthSliceState = {
  status: AuthStatus;
  authenticatedUser: UserState;
};

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    status: AuthStatus.CHECKING,
    authenticatedUser: userEmptyState,
  },
  reducers: {
    onCheking: (state) => {
      return { ...state };
    },

    onLogin: (state, { payload }: PayloadAction<UserState>) => {
      return { ...state, authenticatedUser: payload, status: AuthStatus.AUTHENTICATE };
    },

    onLogout: (state) => {
      return {
        ...state,
        authenticatedUser: userEmptyState,
        status: AuthStatus.NOT_AUTHENTICATE,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { onCheking, onLogin, onLogout } = authSlice.actions;
