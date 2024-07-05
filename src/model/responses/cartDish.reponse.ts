export interface AddOneDishResponse<T> {
    message: string;
    cartItem: T;
  }
  export interface GetDishesByUserResponse<T> {
    message: string;
    cart: T[];
    totalQuantity: number;
    totalPayment: number;
  }
  
  export interface DeleteOneDishResponse {
    message: string;
    quantity: number;
  }
  
  export interface DeleteAllDishesResponse extends DeleteOneDishResponse {}
  
  export interface GetDishByDishIdResponse<T> {
    message: string;
    cartItem: T;
  }
  
  export interface GetTotalDishesByUserResponse {
    message: string;
    totalQuantity: number;
  }
  