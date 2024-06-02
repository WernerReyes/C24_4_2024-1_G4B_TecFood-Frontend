import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { cartEmptyState, type CartState } from "@/model";

type OnLoadCartType = {
  cart: CartState[];
  totalQuantity: number;
  totalPayment: number;
};

export type CartSliceState = {
  isLoading: boolean;
  cartItem: CartState;
  cart: CartState[];
  totalQuantity: number;
  totalPayment: number;
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    isLoading: true,
    cartItem: cartEmptyState,
    cart: [] as CartState[],
    totalQuantity: 0,
    totalPayment: 0,
  },
  reducers: {
    onAddOneDish(state) {
      return {
        ...state,
        isLoading: false,
        totalQuantity: state.totalQuantity + 1,
      };
    },

    onDeleteOneDish(state) {
      return {
        ...state,
        isLoading: false,
        totalQuantity: state.totalQuantity - 1,
      };
    },

    ondeleteAllDishes(state, action: PayloadAction<number>) {
      return {
        ...state,
        isLoading: false,
        totalQuantity: state.totalQuantity - action.payload,
      };
    },

    onLoadCart(state, action: PayloadAction<OnLoadCartType>) {
      const { totalQuantity, totalPayment, cart } = action.payload;
      return { ...state, cart, totalPayment, totalQuantity, isLoading: false };
    },

    onLoadCartItem(state, action: PayloadAction<CartState>) {
      return { ...state, cartItem: action.payload, isLoading: false };
    },

    onLoadingCart: (state) => {
      return { ...state, isLoading: true };
    },
  },
});

export const {
  onLoadingCart,
  onLoadCart,
  onLoadCartItem,
  onAddOneDish,
  onDeleteOneDish,
  ondeleteAllDishes,
} = cartSlice.actions;
