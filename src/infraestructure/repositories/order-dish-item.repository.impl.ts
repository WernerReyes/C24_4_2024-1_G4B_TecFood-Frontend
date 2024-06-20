import { OrderDishItemRepository } from "@/domain/repositories";
import { GetOrderDishItemByOrderModel } from "@/model";
import { OrderDishItemService } from "../services";

export class OrderDishItemRepositoryImpl implements OrderDishItemRepository {
  constructor(private readonly service: OrderDishItemService) {}

  public async getOrderDishItemByOrder(
    orderDishId: number,
  ): Promise<GetOrderDishItemByOrderModel> {
    return await this.service.getOrderDishItemByOrder(orderDishId);
  }
}
