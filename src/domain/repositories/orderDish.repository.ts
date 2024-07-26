import type { OrderDishModel } from "@/model";
import type {
  ApiResponse,
  GetOrderDishesByUserRequest,
  GetOrderDishesByUserResponse,
  PagedResponse,
  UpdateOrderDishStatusRequest,
} from "../dtos";
import type { OrderDishStatusEnum } from "../entities";

export abstract class OrderDishRepository {
  abstract createOrderDish(): Promise<ApiResponse<OrderDishModel>>;
  abstract updateOrderDishStatus(
    updateOrderDishStatusRequest: UpdateOrderDishStatusRequest,
  ): Promise<ApiResponse<OrderDishStatusEnum>>;
  abstract getOrderDishesByUser(
    getOrderDishesByUserRequest: GetOrderDishesByUserRequest,
  ): Promise<
    ApiResponse<PagedResponse<GetOrderDishesByUserResponse<OrderDishModel>>>
  >;
  abstract getOrderDishById(
    orderDishId: number,
  ): Promise<ApiResponse<OrderDishModel>>;
}
