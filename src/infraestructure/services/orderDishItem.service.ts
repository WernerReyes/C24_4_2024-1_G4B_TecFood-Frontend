import { orderDishItemAdapter } from "@/config/adapters";
import { httpRequest } from "@/config/api";
import type { OrderDishItemEntity } from "@/domain/entities";
import type {
  GetOrderDishItemByOrderResponse,
  OrderDishItemModel,
} from "@/model";

interface IOrderDishItemService {
  getOrderDishItemByOrder(
    orderId: number,
  ): Promise<GetOrderDishItemByOrderResponse<OrderDishItemModel>>;
}

export class OrderDishItemService implements IOrderDishItemService {
  private prefix: string;

  constructor() {
    this.prefix = "/order-dish-item";
  }

  public async getOrderDishItemByOrder(
    orderDishId: number,
  ): Promise<GetOrderDishItemByOrderResponse<OrderDishItemModel>> {
    try {
      const { data } = await httpRequest<
        GetOrderDishItemByOrderResponse<OrderDishItemEntity>
      >(this.prefix + "/order/" + orderDishId, "GET");
      return {
        ...data,
        orderDishItem: data.orderDishItem.map(orderDishItemAdapter),
      };
    } catch (error) {
      throw error;
    }
  }
}
