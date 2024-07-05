import type {
  GetOrderDishItemByOrderResponse,
  OrderDishItemModel,
} from "@/model";

export abstract class OrderDishItemRepository {
  abstract getOrderDishItemByOrder(
    orderId: number,
  ): Promise<GetOrderDishItemByOrderResponse<OrderDishItemModel>>;
}
