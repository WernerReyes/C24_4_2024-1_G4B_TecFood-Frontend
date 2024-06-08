import { cartAdapter } from "@/config/adapters";
import { httpRequest } from "@/config/api";
import {
  AddOneDishResponse,
  DeleteOneDishResponse,
  deleteAllDishesResponse,
  GetDishesByUserResponse,
  GetDishByDishIdResponse,
  GetTotalDishesByUserResponse,
} from "@/domain/entities";
import {
  AddOneDishModel,
  DeleteOneDishModel,
  DeleteAllDishesModel,
  GetDishesByUserModel,
  GetDishByDishIdModel,
  GetTotalDishesByUserModel,
} from "@/model";

interface ICartDishService {
  addOneDish(dishId: number): Promise<AddOneDishModel>;
  getDishesByUser(): Promise<GetDishesByUserModel>;
  deleteOneDish(dishId: number): Promise<DeleteOneDishModel>;
  deleteAllDishes(cartId: number): Promise<DeleteAllDishesModel>;
  getDishByDishId(dishId: number): Promise<GetDishByDishIdModel>;
  getTotalDishesByUser(): Promise<GetTotalDishesByUserModel>;
}

export class CartDishService implements ICartDishService {
  private baseUrl = "/cart-dish";

  public async addOneDish(dishId: number): Promise<AddOneDishModel> {
    try {
      const { data } = await httpRequest<AddOneDishResponse>(
        this.baseUrl,
        "POST",
        { dishId },
      );
      return { ...data, cartItem: cartAdapter(data.cartItem) };
    } catch (error) {
      throw error;
    }
  }

  public async getDishesByUser(): Promise<GetDishesByUserModel> {
    try {
      const { data } = await httpRequest<GetDishesByUserResponse>(
        `${this.baseUrl}/user`,
        "GET",
      );

      return { ...data, cart: data.cart.map(cartAdapter) };
    } catch (error) {
      throw error;
    }
  }

  public async deleteOneDish(dishId: number): Promise<DeleteOneDishModel> {
    try {
      const { data } = await httpRequest<DeleteOneDishResponse>(
        `${this.baseUrl}/${dishId}`,
        "DELETE",
      );
      return data;
    } catch (error) {
      throw error;
    }
  }

  public async deleteAllDishes(dishId: number): Promise<DeleteAllDishesModel> {
    try {
      const { data } = await httpRequest<deleteAllDishesResponse>(
        `${this.baseUrl}/all/${dishId}`,
        "DELETE",
      );
      return data;
    } catch (error) {
      throw error;
    }
  }

  public async getDishByDishId(dishId: number): Promise<GetDishByDishIdModel> {
    console.log(dishId);
    try {
      const { data } = await httpRequest<GetDishByDishIdResponse>(
        `${this.baseUrl}/dish/${dishId}`,
        "GET",
      );
      return { ...data, cartItem: cartAdapter(data.cartItem) };
    } catch (error) {
      throw error;
    }
  }

  public async getTotalDishesByUser(): Promise<GetTotalDishesByUserModel> {
    try {
      const { data } = await httpRequest<GetTotalDishesByUserResponse>(
        `${this.baseUrl}/total`,
        "GET",
      );
      return data;
    } catch (error) {
      throw error;
    }
  }
}
