import { orderDishItemAdapter } from "@/config/adapters";
import { httpRequest } from "@/config/api";
import type { ApiResponse } from "@/domain/dtos";
import type { OrderDishItemEntity } from "@/domain/entities";
import type { OrderDishItemModel } from "@/model";

interface IOrderDishItemService {
  getOrderDishItemByOrder(
    orderId: number,
  ): Promise<ApiResponse<OrderDishItemModel[]>>;
}

export class OrderDishItemService implements IOrderDishItemService {
  private prefix: string;

  constructor() {
    this.prefix = "/order-dish-item";
  }

  public async getOrderDishItemByOrder(orderDishId: number) {
    try {
      const { data, ...rest } = await httpRequest<OrderDishItemEntity[]>(
        this.prefix + "/order/" + orderDishId,
        "GET",
      );
      return {
        data: data.map(orderDishItemAdapter),
        ...rest,
      };
    } catch (error) {
      throw error;
    }
  }
}
