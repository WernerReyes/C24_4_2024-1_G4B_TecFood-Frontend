import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import type { DishState } from "@/model";
import { dishEmptyState } from "@/model";

export const dishSlice = createSlice({
  name: "dish",
  initialState: {
    isLoading: true,
    dish: dishEmptyState,
    dishes: [] as DishState[],
  },
  reducers: {
    onLoadDishes(state, action: PayloadAction<DishState[]>) {
        console.log('action.payload', action.payload)
      return { ...state, dishes: action.payload, isLoading: false };
    },

    onLoadingDish: (state) => {
      return { ...state, isLoading: true };
    },
  },
});

export const { onLoadingDish, onLoadDishes } = dishSlice.actions;
