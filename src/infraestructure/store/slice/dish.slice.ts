import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { dishEmptyState, type DishState } from "@/model";

export type DishSliceState = {
  isLoading: boolean;
  dish: DishState;
  dishes: DishState[];
};

export const dishSlice = createSlice({
  name: "dish",
  initialState: {
    isLoading: true,
    dish: dishEmptyState,
    dishes: [] as DishState[],
  },
  reducers: {
    onLoadDishes(state, action: PayloadAction<DishState[]>) {
      return { ...state, dishes: action.payload, isLoading: false };
    },

    onLoadingDish: (state) => {
      return { ...state, isLoading: true };
    },
  },
});

export const { onLoadingDish, onLoadDishes } = dishSlice.actions;

