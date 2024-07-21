import { UserModel, userEmptyState } from "@/model";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export enum AuthStatus {
  CHECKING = "checking",
  AUTHENTICATE = "authenticated",
  NOT_AUTHENTICATE = "not-authenticated",
}

export type AuthSliceState = {
  status: AuthStatus;
  authenticatedUser: UserModel;
};

const initialState: AuthSliceState = {
  status: AuthStatus.CHECKING,
  authenticatedUser: userEmptyState,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    onCheking: (state) => {
      return { ...state };
    },

    onLogin: (state, { payload }: PayloadAction<UserModel>) => {
      return { ...state, authenticatedUser: payload, status: AuthStatus.AUTHENTICATE };
    },

    onLogout: () => {
      return {
        ...initialState,
        status: AuthStatus.NOT_AUTHENTICATE,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { onCheking, onLogin, onLogout } = authSlice.actions;
