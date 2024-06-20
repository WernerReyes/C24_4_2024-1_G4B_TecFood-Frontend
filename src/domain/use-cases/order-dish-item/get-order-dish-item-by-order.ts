import type {
  OrderDishItemRepository,
} from "@/domain/repositories";
import type { GetOrderDishItemByOrderModel } from "@/model";

interface GetOrderDishItemByOrderUserUseCase {
  execute(orderDishId: number): Promise<GetOrderDishItemByOrderModel>;
}

export class GetOrderDishItemByOrderUser
  implements GetOrderDishItemByOrderUserUseCase
{
  constructor(private readonly repository: OrderDishItemRepository) {}

  public async execute(
    orderDishId: number,
  ): Promise<GetOrderDishItemByOrderModel> {
    return await this.repository.getOrderDishItemByOrder(orderDishId);
  }
}
