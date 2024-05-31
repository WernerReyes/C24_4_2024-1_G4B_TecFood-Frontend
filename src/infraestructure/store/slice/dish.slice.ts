import {
  DishFilters,
  dishEmptyState,
  dishFilterEmptyState,
  type DishState,
} from "@/model";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type DishSliceState = {
  isLoading: boolean;
  dish: DishState;
  dishes: DishState[];
  dishesToSearch: DishState[];
  filters: DishFilters;
};

export const dishSlice = createSlice({
  name: "dish",
  initialState: {
    isLoading: true,
    dish: dishEmptyState,
    dishes: [] as DishState[],
    dishesToSearch: [] as DishState[],
    filters: dishFilterEmptyState,
  },
  reducers: {
    onLoadDishes(state, action: PayloadAction<DishState[]>) {
      return { ...state, dishes: action.payload, isLoading: false };
    },

    onLoadDishesToSearch(state, action: PayloadAction<DishState[]>) {
      return { ...state, dishesToSearch: action.payload };
    },

    onLoadingDish: (state) => {
      return { ...state, isLoading: true };
    },

    onSetDishFilters: (state, action: PayloadAction<DishFilters>) => {
      return {
        ...state,
        filters: action.payload,
      };
    },
  },
});

export const {
  onLoadingDish,
  onLoadDishes,
  onSetDishFilters,
  onLoadDishesToSearch,
} = dishSlice.actions;
