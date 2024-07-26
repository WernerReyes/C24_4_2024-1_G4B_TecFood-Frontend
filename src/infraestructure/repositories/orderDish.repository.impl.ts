import type {
  GetOrderDishesByUserRequest,
  UpdateOrderDishStatusRequest,
} from "@/domain/dtos";
import type { OrderDishRepository } from "@/domain/repositories";
import type { OrderDishService } from "../services";

export class OrderDishRepositoryImpl implements OrderDishRepository {
  constructor(private readonly orderDishService: OrderDishService) {}

  public async createOrderDish() {
    return await this.orderDishService.createOrderDish();
  }

  public async updateOrderDishStatus(
    updateOrderDishStatusRequest: UpdateOrderDishStatusRequest,
  ) {
    return await this.orderDishService.updateOrderDishStatus(
      updateOrderDishStatusRequest,
    );
  }

  public async getOrderDishesByUser(
    getOrderDishesByUserRequest: GetOrderDishesByUserRequest,
  ) {
    return await this.orderDishService.getOrderDishesByUser(
      getOrderDishesByUserRequest,
    );
  }

  public async getOrderDishById(orderDishId: number) {
    return await this.orderDishService.getOrderDishById(orderDishId);
  }
}
