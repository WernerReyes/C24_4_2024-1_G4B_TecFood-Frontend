import type { UpdateOrderDishStatusDto } from "@/domain/dtos";
import type { OrderDishRepository } from "@/domain/repositories";
import type { UpdateOrderDishStatusModel } from "@/model";

interface UpdateOrderDishStatusUseCase {
  execute(
    updateOrderDishStatusDto: UpdateOrderDishStatusDto,
  ): Promise<UpdateOrderDishStatusModel>;
}

export class UpdateOrderDishStatus implements UpdateOrderDishStatusUseCase {
  constructor(private readonly repository: OrderDishRepository) {}

  public async execute(
    updateOrderDishStatusDto: UpdateOrderDishStatusDto,
  ): Promise<UpdateOrderDishStatusModel> {
    return await this.repository.updateOrderDishStatus(
      updateOrderDishStatusDto,
    );
  }
}
