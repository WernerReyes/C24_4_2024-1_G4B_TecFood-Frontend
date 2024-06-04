import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./slice/auth.slice";
import { dishOfferSlice } from "./slice/dis-offer.slice";
import { dishCategorySlice } from "./slice/dish-category.slice";
import { dishSlice } from "./slice/dish.slice";
import { themesSlice } from "./slice/theme.slice";
import { userSlice } from "./slice/user.slice";
import { AppState } from "./state";
import { messageSlice } from "./slice/message.slice";
import { cartSlice } from "./slice/cart.slice";


export const store = configureStore<AppState>({
  reducer: {
    themes: themesSlice.reducer,
    message: messageSlice.reducer,
    user: userSlice.reducer,
    dishOffer: dishOfferSlice.reducer,
    auth: authSlice.reducer,
    dish: dishSlice.reducer,
    dishCategory: dishCategorySlice.reducer,
    cart: cartSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
