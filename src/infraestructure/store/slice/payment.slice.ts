import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { type PaymentModel, paymentEmptyState } from "@/model";

export type PaymentSliceState = {
  isLoading: boolean;
  payment: PaymentModel;
  payments: PaymentModel[];
};

const initialState: PaymentSliceState = {
  isLoading: false,
  payment: paymentEmptyState,
  payments: [],
};

export const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    onProcessPayment: (state, action: PayloadAction<PaymentModel>) => {
      return {
        ...state,
        payment: action.payload,
        isLoading: false,
      };
    },

    onResetPayment: () => {
      return { ...initialState };
    },

    onLoadingPayment: (state) => {
      return {
        ...state,
        isLoading: true,
      };
    },
  },
});

export const { onLoadingPayment, onProcessPayment, onResetPayment } =
  paymentSlice.actions;
