import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { DishOfferState, dishOfferEmptyState } from "@/model";

export const dishOfferSlice = createSlice({
  name: "dishOffer",
  initialState: {
    isLoading: true,
    dishOffer: dishOfferEmptyState,
    dishOffers: [] as DishOfferState[],
  },
  reducers: {
    onLoadDishOffers(state, action: PayloadAction<DishOfferState[]>) {
      return { ...state, dishOffers: action.payload, isLoading: false };
    },

    onLoadingDishOffers: (state) => {
      return { ...state, isLoading: true };
    },
  },
});

export const { onLoadingDishOffers, onLoadDishOffers } = dishOfferSlice.actions;
