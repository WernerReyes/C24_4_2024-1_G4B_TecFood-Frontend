import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  type OrderDishState,
  type OrderDishFilter,
  orderDishEmptyState,
  orderDishFilterEmptyState,
} from "@/model";
import { OrderDishStatusEnum } from "@/domain/entities";

export type OrderDishSliceState = {
  isLoading: boolean;
  orderDish: OrderDishState;
  status: OrderDishStatusEnum;
  total: number;
  filters: OrderDishFilter;
  orderDishes: OrderDishState[];
};

export const orderDishSlice = createSlice({
  name: "orderDish",
  initialState: {
    isLoading: true,
    status: OrderDishStatusEnum.PENDING,
    orderDish: orderDishEmptyState,
    filters: orderDishFilterEmptyState,
    total: 0,
    orderDishes: [] as OrderDishState[],
  },
  reducers: {
    onCreateOrderDish(state, action: PayloadAction<OrderDishState>) {
      return { ...state, orderDish: action.payload, isLoading: false };
    },

    onUpdateOrderDishStatus(state, action: PayloadAction<OrderDishStatusEnum>) {
      return { ...state, status: action.payload, isLoading: false };
    },

    onLoadOrderDishes(
      state,
      action: PayloadAction<{ orderDishes: OrderDishState[]; total: number }>,
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

    onLoadingOrderDish(state) {
      return { ...state, isLoading: true };
    },
  },
});

export const {
  onCreateOrderDish,
  onUpdateOrderDishStatus,
  onLoadOrderDishes,
  onLoadingOrderDish,
  onSetOrderDishFilters,
} = orderDishSlice.actions;
