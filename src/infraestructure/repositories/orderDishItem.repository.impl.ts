import type { OrderDishItemRepository } from "@/domain/repositories";
import type { OrderDishItemService } from "../services";

export class OrderDishItemRepositoryImpl implements OrderDishItemRepository {
  constructor(private readonly service: OrderDishItemService) {}

  public async getOrderDishItemByOrder(
    orderDishId: number,
  ) {
    return await this.service.getOrderDishItemByOrder(orderDishId);
  }
}
