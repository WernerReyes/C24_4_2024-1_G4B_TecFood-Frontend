import { configureStore } from "@reduxjs/toolkit";
import type { DishOfferState, DishState, UserState } from "@/model";
import { userSlice } from "./slice/user.slice";
import { themesSlice } from "./slice/theme.slice";
import { dishOfferSlice } from "./slice/dis-offer.slice";
import { AuthStatus, authSlice } from "./slice/auth.slice";
import { dishSlice } from "./slice/dish.slice";

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
  auth: {
    status: AuthStatus;
    user: UserState;
    message: string | undefined;
  };
  dish: {
    isLoading: boolean;
    dish: DishState;
    dishes: DishState[];
  };
}

export const store = configureStore<AppState>({
  reducer: {
    user: userSlice.reducer,
    themes: themesSlice.reducer,
    dishOffer: dishOfferSlice.reducer,
    auth: authSlice.reducer,
    dish: dishSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
