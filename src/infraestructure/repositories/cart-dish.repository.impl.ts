import type { CartDishRepository } from "@/domain/repositories";
import { CartDishService } from "../services";

export class CartDishRepositoryImpl implements CartDishRepository {
  constructor(private readonly CartDishService: CartDishService) {}

  async addOneDish(dishId: number) {
    return await this.CartDishService.addOneDish(dishId);
  }

  async getDishesByUser() {
    return await this.CartDishService.getDishesByUser();
  }

  async deleteOneDish(dishId: number) {
    return await this.CartDishService.deleteOneDish(dishId);
  }

  async deleteAllDishes(cartId: number) {
    return await this.CartDishService.deleteAllDishes(cartId);
  }

  async getDishByDishId(dishId: number) {
    return await this.CartDishService.getDishByDishId(dishId);
  }

  async getTotalDishesByUser() {
    return await this.CartDishService.getTotalDishesByUser();
  }
}
