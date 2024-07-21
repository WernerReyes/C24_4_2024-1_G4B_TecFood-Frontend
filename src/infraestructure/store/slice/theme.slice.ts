import { getStorage } from "@/presentation/utilities";
import { createSlice } from "@reduxjs/toolkit";

export type ThemeSliceState = {
  currentTheme: string;
};

const initialState: ThemeSliceState = {
  currentTheme: getStorage<string>("theme") || "light",
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    changeTheme: (state, action) => {
      return { ...state, currentTheme: action.payload };
    },
  },
});

export const { changeTheme } = themeSlice.actions;
