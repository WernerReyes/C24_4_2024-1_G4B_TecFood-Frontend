import { orderDishItemEmptyState, type OrderDishItemState } from "@/model";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type OrderDishItemSliceState = {
  isLoading: boolean;
  orderDishItem: OrderDishItemState;
  orderDishItems: OrderDishItemState[];
};

export const orderDishItemSlice = createSlice({
  name: "orderDishItem",
  initialState: {
    isLoading: true,
    orderDishItem: orderDishItemEmptyState,
    orderDishItems: [] as OrderDishItemState[],
  },
  reducers: {
    onLoadOrderDishItems(state, action: PayloadAction<OrderDishItemState[]>) {
      return { ...state, orderDishItems: action.payload, isLoading: false };
    },
    onLoadingOrderDishItem(state) {
      return { ...state, isLoading: true };
    },
  },
});

export const { onLoadOrderDishItems, onLoadingOrderDishItem } =
  orderDishItemSlice.actions;
