import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import type { DishCategoryState } from "@/model";
import { dishCategoryEmptyState } from "@/model";

export const dishCategorySlice = createSlice({
  name: "dishCategory",
  initialState: {
    isLoading: true,
    dishCategory: dishCategoryEmptyState,
    dishCategories: [] as DishCategoryState[],
  },
  reducers: {
    onLoadDishCategories(state, action: PayloadAction<DishCategoryState[]>) {
      return { ...state, dishCategories: action.payload, isLoading: false };
    },

    onLoadingDishCategory: (state) => {
      return { ...state, isLoading: true };
    },
  },
});

export const { onLoadingDishCategory, onLoadDishCategories } =
  dishCategorySlice.actions;
