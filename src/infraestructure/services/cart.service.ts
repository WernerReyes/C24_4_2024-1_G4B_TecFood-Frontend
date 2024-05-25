import { cartAdapter } from "@/config/adapters";
import { httpRequest } from "@/config/api";
import {
  AddOneDishResponse,
  DeleteOneDishResponse,
  deleteAllDishesResponse,
  GetDishesByUserResponse,
} from "@/domain/entities";
import {
  AddOneDishModel,
  DeleteOneDishModel,
  DeleteAllDishesModel,
  GetDishesByUserModel,
} from "@/model";

interface ICartService {
  addOneDish(dishId: number): Promise<AddOneDishModel>;
  getDishesByUser(): Promise<GetDishesByUserModel>;
  deleteOneDish(dishId: number): Promise<DeleteOneDishModel>;
  deleteAllDishes(cartId: number): Promise<DeleteAllDishesModel>;
}

export class CartService implements ICartService {
  private baseUrl = "/cart";

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
}
