import { orderDishItemEmptyState, type OrderDishItemModel } from "@/model";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type OrderDishItemSliceState = {
  isLoading: boolean;
  orderDishItem: OrderDishItemModel;
  orderDishItems: OrderDishItemModel[];
};

const initialState: OrderDishItemSliceState = {
  isLoading: false,
  orderDishItem: orderDishItemEmptyState,
  orderDishItems: [],
};

export const orderDishItemSlice = createSlice({
  name: "orderDishItem",
  initialState,
  reducers: {
    onLoadOrderDishItems(state, action: PayloadAction<OrderDishItemModel[]>) {
      return { ...state, orderDishItems: action.payload, isLoading: false };
    },
    onLoadingOrderDishItem(state) {
      return { ...state, isLoading: true };
    },

    onResetOrderDishItem() {
      return { ...initialState };
    },
  },
});

export const {
  onLoadOrderDishItems,
  onLoadingOrderDishItem,
  onResetOrderDishItem,
} = orderDishItemSlice.actions;
