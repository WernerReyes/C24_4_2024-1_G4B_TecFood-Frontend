import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./slice/auth.slice";
import { dishOfferSlice } from "./slice/dis-offer.slice";
import { dishCategorySlice } from "./slice/dishCategory.slice";
import { dishSlice } from "./slice/dish.slice";
import { themeSlice } from "./slice/theme.slice";
import { userSlice } from "./slice/user.slice";
import { AppState } from "./state";
import { messageSlice } from "./slice/message.slice";
import { cartSlice } from "./slice/cartDish.slice";
import { orderDishSlice } from "./slice/orderDish.slice";
import { orderDishItemSlice } from "./slice/orderDishItem.slice";
import { paymentSlice } from "./slice/payment.slice";
import { openAISlice } from "./slice/openAI.slice";

export const store = configureStore<AppState>({
  reducer: {
    theme: themeSlice.reducer,
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
    openAI: openAISlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
