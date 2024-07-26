import type {
  CartDishModel
} from "@/model";
import type { ApiResponse, GetDishesToCartByUserResponse } from "../dtos";
export abstract class CartDishRepository {
  abstract addOneDish(dishId: number): Promise<ApiResponse<CartDishModel>>;
  abstract getDishesByUser(): Promise<
    ApiResponse<GetDishesToCartByUserResponse<CartDishModel>>
  >;
  abstract deleteOneDish(dishId: number): Promise<ApiResponse<number>>;
  abstract deleteAllDishes(cartId: number): Promise<ApiResponse<number>>;
  abstract getDishByDishId(dishId: number): Promise<ApiResponse<CartDishModel>>;
  abstract getTotalDishesByUser(): Promise<ApiResponse<number>>;
}
