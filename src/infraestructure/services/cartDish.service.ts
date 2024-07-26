import { cartAdapter } from "@/config/adapters";
import { httpRequest } from "@/config/api";
import type { ApiResponse, GetDishesToCartByUserResponse } from "@/domain/dtos";
import type { CartDishEntity } from "@/domain/entities";
import type { CartDishModel } from "@/model";

interface ICartDishService {
  addOneDish(dishId: number): Promise<ApiResponse<CartDishModel>>;
  getDishesByUser(): Promise<
    ApiResponse<GetDishesToCartByUserResponse<CartDishModel>>
  >;
  deleteOneDish(dishId: number): Promise<ApiResponse<number>>;
  deleteAllDishes(cartId: number): Promise<ApiResponse<number>>;
  getDishByDishId(dishId: number): Promise<ApiResponse<CartDishModel>>;
  getTotalDishesByUser(): Promise<ApiResponse<number>>;
}

export class CartDishService implements ICartDishService {
  private prefix: string;

  constructor() {
    this.prefix = "/cart-dish";
  }

  public async addOneDish(dishId: number) {
    try {
      const { data, ...rest } = await httpRequest<CartDishEntity>(
        this.prefix,
        "POST",
        {
          dishId,
        },
      );
      return { data: cartAdapter(data), ...rest };
    } catch (error) {
      throw error;
    }
  }

  public async getDishesByUser() {
    try {
      const { data, ...rest } = await httpRequest<
        GetDishesToCartByUserResponse<CartDishEntity>
      >(`${this.prefix}/user`, "GET");

      return {
        data: {
          ...data,
          cart: data.cart.map(cartAdapter),
        },
        ...rest,
      };
    } catch (error) {
      throw error;
    }
  }

  public async deleteOneDish(dishId: number) {
    try {
      return await httpRequest<number>(`${this.prefix}/${dishId}`, "DELETE");
    } catch (error) {
      throw error;
    }
  }

  public async deleteAllDishes(dishId: number) {
    try {
      return await httpRequest<number>(
        `${this.prefix}/all/${dishId}`,
        "DELETE",
      );
    } catch (error) {
      throw error;
    }
  }

  public async getDishByDishId(dishId: number) {
    try {
      const { data, ...rest } = await httpRequest<CartDishEntity>(
        `${this.prefix}/dish/${dishId}`,
        "GET",
      );
      return { data: cartAdapter(data), ...rest };
    } catch (error) {
      throw error;
    }
  }

  public async getTotalDishesByUser() {
    try {
      return await httpRequest<number>(`${this.prefix}/total`, "GET");
    } catch (error) {
      throw error;
    }
  }
}
