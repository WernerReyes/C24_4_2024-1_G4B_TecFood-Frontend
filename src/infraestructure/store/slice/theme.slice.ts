import { getStorage } from "@/presentation/utilities";
import { createSlice } from "@reduxjs/toolkit";

export type ThemeSliceState = {
  currentTheme: string;
};

export const themesSlice = createSlice({
  name: "themes",
  initialState: {
    currentTheme: getStorage<string>("theme") || "light",
  },
  reducers: {
    changeTheme: (state, action) => {
      return { ...state, currentTheme: action.payload };
    },
  },
});

export const { changeTheme } = themesSlice.actions;
