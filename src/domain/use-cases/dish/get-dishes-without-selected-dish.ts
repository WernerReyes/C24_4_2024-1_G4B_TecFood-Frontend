import type { GetDishesWithoutSelectedDishDto } from "@/domain/dtos";
import type { DishRepository } from "@/domain/repositories";
import type { GetDishesWithoutSelectedDishModel } from "@/model";

interface GetDishesWithoutSelectedUseCase {
  execute(
    getDishesWithoutSelectedDishDto: GetDishesWithoutSelectedDishDto,
  ): Promise<GetDishesWithoutSelectedDishModel>;
}

export class GetDishesWithoutSelectedDish
  implements GetDishesWithoutSelectedUseCase
{
  constructor(private readonly dishRepository: DishRepository) {}

  async execute(
    getDishesWithoutSelectedDishDto: GetDishesWithoutSelectedDishDto,
  ) {
    return await this.dishRepository.getAllWithoutSelectedDish(
      getDishesWithoutSelectedDishDto,
    );
  }
}
