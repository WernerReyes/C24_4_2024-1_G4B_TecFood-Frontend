import { orderDishItemAdapter } from "@/config/adapters";
import { httpRequest } from "@/config/api";
import type { GetOrderDishItemByOrderResponse } from "@/domain/entities";
import type { GetOrderDishItemByOrderModel } from "@/model";

interface IOrderDishItemService {
  getOrderDishItemByOrder(
    orderId: number,
  ): Promise<GetOrderDishItemByOrderModel>;
}

export class OrderDishItemService implements IOrderDishItemService {
  private prefix: string;

  constructor() {
    this.prefix = "/order-dish-item";
  }

  public async getOrderDishItemByOrder(
    orderDishId: number,
  ): Promise<GetOrderDishItemByOrderModel> {
    try {
      const { data } = await httpRequest<GetOrderDishItemByOrderResponse>(
        this.prefix + "/order/" + orderDishId,
        "GET",
      );
      return {
        ...data,
        orderDishItem: data.orderDishItem.map(orderDishItemAdapter),
      };
    } catch (error) {
      throw error;
    }
  }
}
