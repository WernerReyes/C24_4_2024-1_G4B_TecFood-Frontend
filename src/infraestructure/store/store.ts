import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./slice/auth.slice";
import { dishOfferSlice } from "./slice/dis-offer.slice";
import { dishCategorySlice } from "./slice/dish-category.slice";
import { dishSlice } from "./slice/dish.slice";
import { themesSlice } from "./slice/theme.slice";
import { userSlice } from "./slice/user.slice";
import { AppState } from "./state";
import { messageSlice } from "./slice/message.slice";
import { cartSlice } from "./slice/cart-dish.slice";
import { orderDishSlice } from "./slice/order-dish.slice";
import { orderDishItemSlice } from "./slice/order-dish-item.slice";
import { paymentSlice } from "./slice/payment.slice";
import { openIASlice } from "./slice/open-ia.slice";

export const store = configureStore<AppState>({
  reducer: {
    themes: themesSlice.reducer,
    message: messageSlice.reducer,
    user: userSlice.reducer,
    dishOffer: dishOfferSlice.reducer,
    auth: authSlice.reducer,
    dish: dishSlice.reducer,
    dishCategory: dishCategorySlice.reducer,
    cartDish: cartSlice.reducer,
    orderDish: orderDishSlice.reducer,
    orderDishItem: orderDishItemSlice.reducer,
    payment: paymentSlice.reducer,
    openIA: openIASlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
