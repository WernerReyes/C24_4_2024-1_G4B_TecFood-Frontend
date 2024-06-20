import { OrderDishRepository } from "@/domain/repositories";
import { CreateOrderDishModel } from "@/model";

interface CreateOrderDishUseCase {
  execute(): Promise<CreateOrderDishModel>;
}

export class CreateOrderDish implements CreateOrderDishUseCase {
  constructor(private readonly repository: OrderDishRepository) {}

  public async execute(): Promise<CreateOrderDishModel> {
    return await this.repository.createOrderDish();
  }
}
