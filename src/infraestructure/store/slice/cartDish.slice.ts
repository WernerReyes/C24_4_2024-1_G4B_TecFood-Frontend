import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CartDishModel, cartEmptyState } from "@/model";

type onLoadCartDishType = {
  cart: CartDishModel[];
  totalPayment: number;
};

export type CartDishSliceState = {
  isLoading: boolean;
  cartItem: CartDishModel;
  cart: CartDishModel[];
  totalQuantity: number;
  totalPayment: number;
};

const initialState: CartDishSliceState = {
  isLoading: false,
  cartItem: cartEmptyState,
  cart: [],
  totalQuantity: 0,
  totalPayment: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
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

    onLoadCartDishItem(state, action: PayloadAction<CartDishModel>) {
      return { ...state, cartItem: action.payload, isLoading: false };
    },

    onLoadTotalDishesByUser(state, action: PayloadAction<number>) {
      return { ...state, totalQuantity: action.payload, isLoading: false };
    },

    onResetCartDish: () => {
      return { ...initialState };
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
