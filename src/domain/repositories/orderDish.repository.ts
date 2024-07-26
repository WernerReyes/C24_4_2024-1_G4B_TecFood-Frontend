import type { OrderDishModel } from "@/model";
import type {
  ApiResponse,
  GetOrderDishesByUserDto,
  GetOrderDishesByUserResponse,
  PagedResponse,
  UpdateOrderDishStatusDto,
} from "../dtos";
import type { OrderDishStatusEnum } from "../entities";

export abstract class OrderDishRepository {
  abstract createOrderDish(): Promise<ApiResponse<OrderDishModel>>;
  abstract updateOrderDishStatus(
    updateOrderDishStatusDto: UpdateOrderDishStatusDto,
  ): Promise<ApiResponse<OrderDishStatusEnum>>;
  abstract getOrderDishesByUser(
    getOrderDishesByUserDto: GetOrderDishesByUserDto,
  ): Promise<
    ApiResponse<PagedResponse<GetOrderDishesByUserResponse<OrderDishModel>>>
  >;
  abstract getOrderDishById(
    orderDishId: number,
  ): Promise<ApiResponse<OrderDishModel>>;
}
