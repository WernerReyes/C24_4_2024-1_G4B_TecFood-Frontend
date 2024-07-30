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
  dishesPaginated: DishModel[];
  dishes: DishModel[];
  dishesWithoutSelectedDish: DishModel[];
  filters: DishFilters;
};

const initialState: DishSliceState = {
  isLoading: false,
  dish: dishEmptyState,
  total: 0,
  dishesPaginated: [],
  dishes: [],
  dishesWithoutSelectedDish: [],
  filters: dishFilterEmptyState,
};

export const dishSlice = createSlice({
  name: "dish",
  initialState,
  reducers: {
    onLoadDishesPaginated(
      state,
      action: PayloadAction<{ total: number; dishes: DishModel[] }>,
    ) {
      return {
        ...state,
        dishesPaginated: action.payload.dishes,
        total: action.payload.total,
        isLoading: false,
      };
    },

    onLoadDishes(state, action: PayloadAction<DishModel[]>) {
      return { ...state, dishes: action.payload, isLoading: false };
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

    onResetDish: () => {
      return { ...initialState };
    },

    onFinishedLoadingDish: (state) => {
      return { ...state, isLoading: false };
    },

    onLoadingDish: (state) => {
      return { ...state, isLoading: true };
    },
  },
});

export const {
  onLoadingDish,
  onLoadDishes,
  onLoadDishesPaginated,
  onLoadDish,
  onSetDishFilters,
  onLoadDishesWithoutSelectedDish,
  onFinishedLoadingDish,
  onResetDish,
} = dishSlice.actions;
