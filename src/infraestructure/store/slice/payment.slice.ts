import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { type PaymentState, paymentEmptyState } from "@/model";

export type PaymentSliceState = {
  isLoading: boolean;
  payment: PaymentState;
  payments: PaymentState[];
};

export const paymentSlice = createSlice({
  name: "payment",
  initialState: {
    isLoading: true,
    payment: paymentEmptyState,
    payments: [] as PaymentState[],
  },
  reducers: {
    onProcessPayment: (state, action: PayloadAction<PaymentState>) => {
      return {
        ...state,
        payment: action.payload,
        isLoading: false,
      };
    },

    onLoadingPayment: (state) => {
      return {
        ...state,
        isLoading: true,
      };
    },
  },
});

export const { onLoadingPayment, onProcessPayment } = paymentSlice.actions;
