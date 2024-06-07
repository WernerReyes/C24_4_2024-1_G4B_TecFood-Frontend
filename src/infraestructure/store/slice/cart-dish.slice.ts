import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { cartEmptyState, type CartState } from "@/model";

type onLoadCartDishType = {
  cart: CartState[];
  totalQuantity: number;
  totalPayment: number;
};

export type CartDishSliceState = {
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

    onLoadCartDish(state, action: PayloadAction<onLoadCartDishType>) {
      const { totalQuantity, totalPayment, cart } = action.payload;
      return { ...state, cart, totalPayment, totalQuantity, isLoading: false };
    },

    onLoadCartDishItem(state, action: PayloadAction<CartState>) {
      return { ...state, cartItem: action.payload, isLoading: false };
    },

    onLoadingCartDish: (state) => {
      return { ...state, isLoading: true };
    },
  },
});

export const {
  onLoadingCartDish,
  onLoadCartDish,
  onLoadCartDishItem,
  onAddOneDish,
  onDeleteOneDish,
  ondeleteAllDishes,
} = cartSlice.actions;
