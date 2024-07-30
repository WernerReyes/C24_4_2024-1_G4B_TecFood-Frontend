import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { dishCategoryEmptyState, type DishCategoryModel } from "@/model";

export type DishCategorySliceState = {
  isLoading: boolean;
  dishCategory: DishCategoryModel;
  dishCategories: DishCategoryModel[];
};

const initialState: DishCategorySliceState = {
  isLoading: false,
  dishCategory: dishCategoryEmptyState,
  dishCategories: [],
};

export const dishCategorySlice = createSlice({
  name: "dishCategory",
  initialState,
  reducers: {
    onLoadDishCategory(state, action: PayloadAction<DishCategoryModel>) {
      return { ...state, dishCategory: action.payload, isLoading: false };
    },

    onLoadDishCategories(state, action: PayloadAction<DishCategoryModel[]>) {
      return { ...state, dishCategories: action.payload, isLoading: false };
    },

    onResetDishCategory() {
      return { ...initialState };
    },

    onFinishedLoadingDishCategory: (state) => {
      return { ...state, isLoading: false };
    },

    onLoadingDishCategory: (state) => {
      return { ...state, isLoading: true };
    },
  },
});

export const {
  onLoadingDishCategory,
  onResetDishCategory,
  onLoadDishCategories,
  onFinishedLoadingDishCategory,
  onLoadDishCategory,
} = dishCategorySlice.actions;
