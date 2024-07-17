import {
  DishFilters,
  dishEmptyState,
  dishFilterEmptyState,
  type DishModel,
} from "@/model";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type DishSliceState = {
  isLoading: boolean;
  dish: DishModel;
  total: number;
  dishes: DishModel[];
  dishesToSearch: DishModel[];
  dishesWithoutSelectedDish: DishModel[];
  filters: DishFilters;
};

export const dishSlice = createSlice({
  name: "dish",
  initialState: {
    isLoading: false,
    dish: dishEmptyState,
    total: 0,
    dishes: [] as DishModel[],
    dishesToSearch: [] as DishModel[],
    dishesWithoutSelectedDish: [] as DishModel[],
    filters: dishFilterEmptyState,
  },
  reducers: {
    onLoadDishes(
      state,
      action: PayloadAction<{ total: number; dishes: DishModel[] }>,
    ) {
      return {
        ...state,
        dishes: action.payload.dishes,
        total: action.payload.total,
        isLoading: false,
      };
    },

    onLoadDishesToSearch(state, action: PayloadAction<DishModel[]>) {
      return { ...state, dishesToSearch: action.payload, isLoading: false };
    },

    onLoadDishesWithoutSelectedDish(state, action: PayloadAction<DishModel[]>) {
      return {
        ...state,
        dishesWithoutSelectedDish: action.payload,
        isLoading: false,
      };
    },

    onLoadDish(state, action: PayloadAction<DishModel>) {
      return { ...state, dish: action.payload, isLoading: false };
    },

    onSetDishFilters: (state, action: PayloadAction<DishFilters>) => {
      return {
        ...state,
        filters: action.payload,
        isLoading: false,
      };
    },

    onLoadingDish: (state) => {
      return { ...state, isLoading: true };
    },
  },
});

export const {
  onLoadingDish,
  onLoadDishes,
  onLoadDish,
  onSetDishFilters,
  onLoadDishesToSearch,
  onLoadDishesWithoutSelectedDish,
} = dishSlice.actions;
