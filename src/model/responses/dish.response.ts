export interface CreateDishResponse<T>
  extends Pick<GetDishByIdResponse<T>, "message" | "dish"> {}

export interface GetDishesResponse<T> {
  message: string;
  dishes: T[];
  currentPage: number;
  totalPages: number;
  limit: number;
  total: number;
  next: string | null;
  previous: string | null;
}

export interface GetDishesToSearchResponse<T>
  extends Pick<GetDishesResponse<T>, "message" | "dishes"> {}

export interface GetDishesWithoutSelectedDishResponse<T>
  extends GetDishesToSearchResponse<T> {}

export interface GetDishByIdResponse<T> {
  message: string;
  dish: T;
}
