import type { GetOrderDishItemByOrderModel } from "@/model";

export interface OrderDishItemRepository {
  getOrderDishItemByOrder(
    orderId: number,
  ): Promise<GetOrderDishItemByOrderModel>;
}
