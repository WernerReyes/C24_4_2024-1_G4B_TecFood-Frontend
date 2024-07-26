import type {
  GetOrderDishesByUserDto,
  UpdateOrderDishStatusDto,
} from "@/domain/dtos";
import type { OrderDishRepository } from "@/domain/repositories";
import type { OrderDishService } from "../services";

export class OrderDishRepositoryImpl implements OrderDishRepository {
  constructor(private readonly orderDishService: OrderDishService) {}

  public async createOrderDish() {
    return await this.orderDishService.createOrderDish();
  }

  public async updateOrderDishStatus(
    updateOrderDishStatusDto: UpdateOrderDishStatusDto,
  ) {
    return await this.orderDishService.updateOrderDishStatus(
      updateOrderDishStatusDto,
    );
  }

  public async getOrderDishesByUser(
    getOrderDishesByUserDto: GetOrderDishesByUserDto,
  ) {
    return await this.orderDishService.getOrderDishesByUser(
      getOrderDishesByUserDto,
    );
  }

  public async getOrderDishById(orderDishId: number) {
    return await this.orderDishService.getOrderDishById(orderDishId);
  }
}
