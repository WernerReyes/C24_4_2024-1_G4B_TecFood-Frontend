import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { cartEmptyState, type CartState } from "@/model";

type onLoadCartDishType = {
  cart: CartState[];
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

    onDeleteAllDishes(state, action: PayloadAction<number>) {
      return {
        ...state,
        isLoading: false,
        totalQuantity: state.totalQuantity - action.payload,
      };
    },

    onLoadCartDish(state, action: PayloadAction<onLoadCartDishType>) {
      const { totalPayment, cart } = action.payload;
      return { ...state, cart, totalPayment, isLoading: false };
    },

    onLoadCartDishItem(state, action: PayloadAction<CartState>) {
      return { ...state, cartItem: action.payload, isLoading: false };
    },

    onLoadTotalDishesByUser(state, action: PayloadAction<number>) {
      return { ...state, totalQuantity: action.payload, isLoading: false };
    },

    onResetCartDish: (state) => {
      return {
        ...state,
        cart: [],
        cartItem: cartEmptyState,
        totalPayment: 0,
        totalQuantity: 0,
      };
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
  onLoadTotalDishesByUser,
  onDeleteAllDishes,
  onResetCartDish,
} = cartSlice.actions;
