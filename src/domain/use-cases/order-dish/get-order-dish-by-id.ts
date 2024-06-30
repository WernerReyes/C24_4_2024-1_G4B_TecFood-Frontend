import { OrderDishRepository } from "@/domain/repositories";
import { OrderDishModel } from "@/model";

interface GetOrderDishByIdUseCase {
  execute(orderDishId: number): Promise<OrderDishModel>;
}

export class GetOrderDishById implements GetOrderDishByIdUseCase {
  constructor(private repository: OrderDishRepository) {}

  async execute(orderDishId: number): Promise<OrderDishModel> {
    return this.repository.getOrderDishById(orderDishId);
  }
}
