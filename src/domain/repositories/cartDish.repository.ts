import type {
  AddOneDishResponse,
  DeleteOneDishResponse,
  DeleteAllDishesResponse,
  GetDishesByUserResponse,
  GetDishByDishIdResponse,
  GetTotalDishesByUserResponse,
  CartDishModel,
} from "@/model";
export abstract class CartDishRepository {
  abstract addOneDish(
    dishId: number,
  ): Promise<AddOneDishResponse<CartDishModel>>;
  abstract getDishesByUser(): Promise<GetDishesByUserResponse<CartDishModel>>;
  abstract deleteOneDish(dishId: number): Promise<DeleteOneDishResponse>;
  abstract deleteAllDishes(cartId: number): Promise<DeleteAllDishesResponse>;
  abstract getDishByDishId(
    dishId: number,
  ): Promise<GetDishByDishIdResponse<CartDishModel>>;
  abstract getTotalDishesByUser(): Promise<GetTotalDishesByUserResponse>;
}
