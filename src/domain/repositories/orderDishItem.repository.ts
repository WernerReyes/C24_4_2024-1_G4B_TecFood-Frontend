import type {
  OrderDishItemModel
} from "@/model";
import type { ApiResponse } from "../dtos";

export abstract class OrderDishItemRepository {
  abstract getOrderDishItemByOrder(
    orderId: number,
  ): Promise<ApiResponse<OrderDishItemModel[]>>;;
}
