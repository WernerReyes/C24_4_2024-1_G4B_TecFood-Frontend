import type { CartRepository } from "@/domain/interfaces";
import { CartService } from "../services";

export class CartRepositoryImpl implements CartRepository {
  constructor(private readonly CartService: CartService) {}

  async addOneDish(dishId: number) {
    return await this.CartService.addOneDish(dishId);
  }

  async getDishesByUser() {
    return await this.CartService.getDishesByUser();
  }

  async deleteOneDish(dishId: number) {
    return await this.CartService.deleteOneDish(dishId);
  }

  async deleteAllDishes(cartId: number) {
    return await this.CartService.deleteAllDishes(cartId);
  }
}
