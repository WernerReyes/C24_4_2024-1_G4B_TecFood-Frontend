import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User, UserState, userEmptyState } from "@/model";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoading: true,
    user: userEmptyState,
    users: [] as UserState[],
  },
  reducers: {
    onLoadUser: (state, action: PayloadAction<User>) => {
      return { ...state, user: action.payload, isLoading: false };
    },

    onUpdateUser: (state, action: PayloadAction<User>) => {
      return { ...state, user: action.payload, isLoading: false };
    },

    deleteUser: (state) => {
      return { ...state, user: userEmptyState, isLoading: false };
    },

    onLoadUsers: (state, action: PayloadAction<User[]>) => {
      return { ...state, users: action.payload, isLoading: false };
    },

    onLoadingUsers: (state) => {
      return { ...state, isLoading: true };
    },
  },
});

export const {
  onUpdateUser,
  deleteUser,
  onLoadUsers,
  onLoadingUsers,
  onLoadUser,
} = userSlice.actions;
