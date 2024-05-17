import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./slice/auth.slice";
import { dishOfferSlice } from "./slice/dis-offer.slice";
import { dishCategorySlice } from "./slice/dish-category.slice";
import { dishSlice } from "./slice/dish.slice";
import { themesSlice } from "./slice/theme.slice";
import { userSlice } from "./slice/user.slice";
import { AppState } from "./state";

export const store = configureStore<AppState>({
  reducer: {
    user: userSlice.reducer,
    themes: themesSlice.reducer,
    dishOffer: dishOfferSlice.reducer,
    auth: authSlice.reducer,
    dish: dishSlice.reducer,
    dishCategory: dishCategorySlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
