import { cartAdapter } from "@/config/adapters";
import { httpRequest } from "@/config/api";
import type { CartDishEntity } from "@/domain/entities";
import type {
  AddOneDishResponse,
  DeleteOneDishResponse,
  DeleteAllDishesResponse,
  GetDishesByUserResponse,
  GetDishByDishIdResponse,
  GetTotalDishesByUserResponse,
  CartDishModel,
} from "@/model";

interface ICartDishService {
  addOneDish(dishId: number): Promise<AddOneDishResponse<CartDishModel>>;
  getDishesByUser(): Promise<GetDishesByUserResponse<CartDishModel>>;
  deleteOneDish(dishId: number): Promise<DeleteOneDishResponse>;
  deleteAllDishes(cartId: number): Promise<DeleteAllDishesResponse>;
  getDishByDishId(
    dishId: number,
  ): Promise<GetDishByDishIdResponse<CartDishModel>>;
  getTotalDishesByUser(): Promise<GetTotalDishesByUserResponse>;
}

export class CartDishService implements ICartDishService {
  private prefix: string;

  constructor() {
    this.prefix = "/cart-dish";
  }

  public async addOneDish(dishId: number) {
    try {
      const { data } = await httpRequest<AddOneDishResponse<CartDishEntity>>(
        this.prefix,
        "POST",
        { dishId },
      );
      return { ...data, cartItem: cartAdapter(data.cartItem) };
    } catch (error) {
      throw error;
    }
  }

  public async getDishesByUser() {
    try {
      const { data } = await httpRequest<
        GetDishesByUserResponse<CartDishEntity>
      >(`${this.prefix}/user`, "GET");

      return { ...data, cart: data.cart.map(cartAdapter) };
    } catch (error) {
      console.log("error", error);
      throw error;
    }
  }

  public async deleteOneDish(dishId: number) {
    try {
      const { data } = await httpRequest<DeleteOneDishResponse>(
        `${this.prefix}/${dishId}`,
        "DELETE",
      );
      return data;
    } catch (error) {
      throw error;
    }
  }

  public async deleteAllDishes(dishId: number) {
    try {
      const { data } = await httpRequest<DeleteAllDishesResponse>(
        `${this.prefix}/all/${dishId}`,
        "DELETE",
      );
      return data;
    } catch (error) {
      throw error;
    }
  }

  public async getDishByDishId(dishId: number) {
    try {
      const { data } = await httpRequest<
        GetDishByDishIdResponse<CartDishEntity>
      >(`${this.prefix}/dish/${dishId}`, "GET");
      return { ...data, cartItem: cartAdapter(data.cartItem) };
    } catch (error) {
      throw error;
    }
  }

  public async getTotalDishesByUser() {
    try {
      const { data } = await httpRequest<GetTotalDishesByUserResponse>(
        `${this.prefix}/total`,
        "GET",
      );
      return data;
    } catch (error) {
      throw error;
    }
  }
}
