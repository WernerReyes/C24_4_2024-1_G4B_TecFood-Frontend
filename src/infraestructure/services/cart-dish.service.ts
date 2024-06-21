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
  private prefix: string;

  constructor() {
    this.prefix = "/cart-dish";
  }

  public async addOneDish(dishId: number): Promise<AddOneDishModel> {
    try {
      const { data } = await httpRequest<AddOneDishResponse>(
        this.prefix,
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
        `${this.prefix}/user`,
        "GET",
      );
      
      return { ...data, cart: data.cart.map(cartAdapter) };
    } catch (error) {
      console.log("error", error);
      throw error;
    }
  }

  public async deleteOneDish(dishId: number): Promise<DeleteOneDishModel> {
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

  public async deleteAllDishes(dishId: number): Promise<DeleteAllDishesModel> {
    try {
      const { data } = await httpRequest<deleteAllDishesResponse>(
        `${this.prefix}/all/${dishId}`,
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
        `${this.prefix}/dish/${dishId}`,
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
        `${this.prefix}/total`,
        "GET",
      );
      return data;
    } catch (error) {
      throw error;
    }
  }
}
