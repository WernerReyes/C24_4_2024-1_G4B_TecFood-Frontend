import type {
  CreateOrderDishResponse,
  GetOrderDishesByUserResponse,
  OrderDishModel,
  UpdateOrderDishStatusResponse,
} from "@/model";
import type {
  GetOrderDishesByUserDto,
  UpdateOrderDishStatusDto,
} from "../dtos";

export abstract class OrderDishRepository {
  abstract createOrderDish(): Promise<CreateOrderDishResponse<OrderDishModel>>;
  abstract updateOrderDishStatus(
    updateOrderDishStatusDto: UpdateOrderDishStatusDto,
  ): Promise<UpdateOrderDishStatusResponse>;
  abstract getOrderDishesByUser(
    getOrderDishesByUserDto: GetOrderDishesByUserDto,
  ): Promise<GetOrderDishesByUserResponse<OrderDishModel>>;
  abstract getOrderDishById(orderDishId: number): Promise<OrderDishModel>;
}
