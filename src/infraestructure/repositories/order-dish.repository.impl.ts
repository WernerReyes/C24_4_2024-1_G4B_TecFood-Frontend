import type { GetOrderDishesByUserDto, UpdateOrderDishStatusDto } from "@/domain/dtos";
import type { OrderDishRepository } from "@/domain/repositories";
import type {
  CreateOrderDishModel,
  GetOrderDishesByUserModel,
  UpdateOrderDishStatusModel,
} from "@/model";
import { OrderDishService } from "../services";

export class OrderDishRepositoryImpl implements OrderDishRepository {
  constructor(private readonly orderDishService: OrderDishService) {}

  public async createOrderDish(): Promise<CreateOrderDishModel> {
    return await this.orderDishService.createOrderDish();
  }

  public async updateOrderDishStatus(
    updateOrderDishStatusDto: UpdateOrderDishStatusDto,
  ): Promise<UpdateOrderDishStatusModel> {
    return await this.orderDishService.updateOrderDishStatus(updateOrderDishStatusDto);
  }

  public async getOrderDishesByUser(getOrderDishesByUserDto: GetOrderDishesByUserDto): Promise<GetOrderDishesByUserModel> {
    return await this.orderDishService.getOrderDishesByUser(getOrderDishesByUserDto);
  }
}
