import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  type OrderDishModel,
  type OrderDishFilter,
  orderDishEmptyState,
  orderDishFilterEmptyState,
} from "@/model";
import { OrderDishStatusEnum } from "@/domain/entities";

export type OrderDishSliceState = {
  isLoading: boolean;
  orderDish: OrderDishModel;
  status: OrderDishStatusEnum;
  total: number;
  filters: OrderDishFilter;
  orderDishes: OrderDishModel[];
};

const initialState: OrderDishSliceState = {
  isLoading: false,
  orderDish: orderDishEmptyState,
  status: OrderDishStatusEnum.PENDING,
  filters: orderDishFilterEmptyState,
  total: 0,
  orderDishes: [],
};

export const orderDishSlice = createSlice({
  name: "orderDish",
  initialState,
  reducers: {
    onCreateOrderDish(state, action: PayloadAction<OrderDishModel>) {
      return { ...state, orderDish: action.payload, isLoading: false };
    },

    onUpdateOrderDishStatus(state, action: PayloadAction<OrderDishStatusEnum>) {
      return { ...state, status: action.payload, isLoading: false };
    },

    onLoadOrderDishes(
      state,
      action: PayloadAction<{ orderDishes: OrderDishModel[]; total: number }>,
    ) {
      return {
        ...state,
        orderDishes: action.payload.orderDishes,
        total: action.payload.total,
        isLoading: false,
      };
    },

    onSetOrderDishFilters: (state, action: PayloadAction<OrderDishFilter>) => {
      return {
        ...state,
        filters: action.payload,
      };
    },

    onResetOrderDish() {
      return { ...initialState };
    },

    onLoadingOrderDish(state) {
      return { ...state, isLoading: true };
    },
  },
});

export const {
  onCreateOrderDish,
  onUpdateOrderDishStatus,
  onResetOrderDish,
  onLoadOrderDishes,
  onLoadingOrderDish,
  onSetOrderDishFilters,
} = orderDishSlice.actions;
