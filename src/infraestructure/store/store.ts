import { configureStore } from "@reduxjs/toolkit";
import { DishOfferState, UserState } from "@/model";
import { userSlice } from "./slice/user.slice";
import { themesSlice } from "./slice/theme.slice";
import { dishOfferSlice } from "./slice/dis-offer.slice";

export interface AppState {
  user: {
    isLoading: boolean;
    user: UserState;
    users: UserState[];
  };
  themes: {
    currentTheme: string;
  };
  dishOffer: {
    isLoading: boolean;
    dishOffer: DishOfferState;
    dishOffers: DishOfferState[];
  };
}

export const store = configureStore<AppState>({
  reducer: {
    user: userSlice.reducer,
    themes: themesSlice.reducer,
    dishOffer: dishOfferSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
