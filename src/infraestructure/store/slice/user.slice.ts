import { UserState, userEmptyState } from "@/model";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type UserSliceState = {
  user: UserState;
  users: UserState[];
  isLoading: boolean;
};

export const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoading: false,
    user: userEmptyState,
    users: [] as UserState[],
  },
  reducers: {
    onLoadUser: (state, action: PayloadAction<UserState>) => {
      return { ...state, user: action.payload, isLoading: false };
    },

    onLoadProfile: (state, action: PayloadAction<string>) => {
      return { ...state, user: {
        ...state.user,
        img: action.payload
      }, isLoading: false };
    },

    onUpdateUser: (state, action: PayloadAction<UserState>) => {
      return { ...state, user: action.payload, isLoading: false };
    },

    deleteUser: (state) => {
      return { ...state, user: userEmptyState, isLoading: false };
    },

    onLoadUsers: (state, action: PayloadAction<UserState[]>) => {
      return { ...state, users: action.payload, isLoading: false };
    },

    onLoadingUsers: (state) => {
      return { ...state, isLoading: true };
    },
  },
});

export const {
  onUpdateUser,
  onLoadProfile,
  deleteUser,
  onLoadUsers,
  onLoadingUsers,
  onLoadUser,
} = userSlice.actions;
