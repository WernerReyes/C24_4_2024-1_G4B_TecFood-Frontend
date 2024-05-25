import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type PaginatorSliceState = {
  currentPage: number;
  limit: number | null;
  total: number;
  next: string | null;
  previous: string | null;
};

export interface Paginator extends PaginatorSliceState {}

export const paginatorSlice = createSlice({
  name: "paginator",
  initialState: {
    currentPage: 1,
    limit: null as number | null,
    total: 1,
    next: null as string | null,
    previous: null as string | null,
  },
  reducers: {
    changePaginator: (state, action: PayloadAction<PaginatorSliceState>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { changePaginator } = paginatorSlice.actions;
