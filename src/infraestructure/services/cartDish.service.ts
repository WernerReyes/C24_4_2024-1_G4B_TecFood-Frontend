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
      const { data, ...rest } = await httpRequest.post<CartDishEntity>(
        this.prefix,
        { dishId },
      );
      return { data: cartAdapter(data), ...rest };
    } catch (error) {
      throw error;
    }
  }

  public async getDishesByUser() {
    try {
      const { data, ...rest } = await httpRequest.get<
        GetDishesToCartByUserResponse<CartDishEntity>
      >(`${this.prefix}/user`);

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
      return await httpRequest.delete<number>(`${this.prefix}/${dishId}`);
    } catch (error) {
      throw error;
    }
  }

  public async deleteAllDishes(dishId: number) {
    try {
      return await httpRequest.delete<number>(`${this.prefix}/all/${dishId}`);
    } catch (error) {
      throw error;
    }
  }

  public async getDishByDishId(dishId: number) {
    try {
      const { data, ...rest } = await httpRequest.get<CartDishEntity>(
        `${this.prefix}/dish/${dishId}`,
      );
      return { data: cartAdapter(data), ...rest };
    } catch (error) {
      throw error;
    }
  }

  public async getTotalDishesByUser() {
    try {
      return await httpRequest.get<number>(`${this.prefix}/total`);
    } catch (error) {
      throw error;
    }
  }
}
