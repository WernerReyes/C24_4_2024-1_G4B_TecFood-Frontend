import type { GetOrderDishesByUserDto } from "@/domain/dtos";
import type { OrderDishRepository } from "@/domain/repositories";
import type { GetOrderDishesByUserModel } from "@/model";

interface GetOrderDishesByUserUseCase {
  execute(
    getOrderDishesByUserDto: GetOrderDishesByUserDto,
  ): Promise<GetOrderDishesByUserModel>;
}

export class GetOrderDishesByUser implements GetOrderDishesByUserUseCase {
  constructor(private readonly repository: OrderDishRepository) {}

  public async execute(
    getOrderDishesByUserDto: GetOrderDishesByUserDto,
  ): Promise<GetOrderDishesByUserModel> {
    return await this.repository.getOrderDishesByUser(getOrderDishesByUserDto);
  }
}
