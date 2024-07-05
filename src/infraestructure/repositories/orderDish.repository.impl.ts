import type {
  GetOrderDishesByUserDto,
  UpdateOrderDishStatusDto,
} from "@/domain/dtos";
import type { OrderDishRepository } from "@/domain/repositories";
import type {
  CreateOrderDishResponse,
  GetOrderDishesByUserResponse,
  OrderDishModel,
  UpdateOrderDishStatusResponse,
} from "@/model";
import { OrderDishService } from "../services";

export class OrderDishRepositoryImpl implements OrderDishRepository {
  constructor(private readonly orderDishService: OrderDishService) {}

  public async createOrderDish(): Promise<
    CreateOrderDishResponse<OrderDishModel>
  > {
    return await this.orderDishService.createOrderDish();
  }

  public async updateOrderDishStatus(
    updateOrderDishStatusDto: UpdateOrderDishStatusDto,
  ): Promise<UpdateOrderDishStatusResponse> {
    return await this.orderDishService.updateOrderDishStatus(
      updateOrderDishStatusDto,
    );
  }

  public async getOrderDishesByUser(
    getOrderDishesByUserDto: GetOrderDishesByUserDto,
  ): Promise<GetOrderDishesByUserResponse<OrderDishModel>> {
    return await this.orderDishService.getOrderDishesByUser(
      getOrderDishesByUserDto,
    );
  }

  public async getOrderDishById(orderDishId: number): Promise<OrderDishModel> {
    return await this.orderDishService.getOrderDishById(orderDishId);
  }
}
