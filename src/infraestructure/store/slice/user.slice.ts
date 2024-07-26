import { UserModel, userEmptyState } from "@/model";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type UserSliceState = {
  user: UserModel;
  users: UserModel[];
  isLoading: boolean;
};

export const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoading: false,
    user: userEmptyState,
    users: [] as UserModel[],
  },
  reducers: {
    onLoadUser: (state, action: PayloadAction<UserModel>) => {
      return { ...state, user: action.payload, isLoading: false };
    },

    onLoadUsers: (state, action: PayloadAction<UserModel[]>) => {
      return { ...state, users: action.payload, isLoading: false };
    },

    onLoadingUsers: (state) => {
      return { ...state, isLoading: true };
    },
  },
});

export const { onLoadUsers, onLoadingUsers, onLoadUser } = userSlice.actions;
