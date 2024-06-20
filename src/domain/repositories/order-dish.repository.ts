import type {
  CreateOrderDishModel,
  GetOrderDishesByUserModel,
  UpdateOrderDishStatusModel,
} from "@/model";
import type { GetOrderDishesByUserDto, UpdateOrderDishStatusDto } from "../dtos";

export interface OrderDishRepository {
  createOrderDish(): Promise<CreateOrderDishModel>;
  updateOrderDishStatus(
    updateOrderDishStatusDto: UpdateOrderDishStatusDto,
  ): Promise<UpdateOrderDishStatusModel>;
  getOrderDishesByUser(getOrderDishesByUserDto: GetOrderDishesByUserDto): Promise<GetOrderDishesByUserModel>;
}
