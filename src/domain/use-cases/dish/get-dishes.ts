import type { DishRepository } from "@/domain/interfaces";
import type { GetDishes } from "@/model";
import type { GetDishesDto } from "../../dtos/dish/";

interface GetDishesUseCase {
  execute(getDishesDto?: GetDishesDto): Promise<GetDishes>;
}

export const getDishes = (repository: DishRepository): GetDishesUseCase => {
  return {
    async execute(getDishesDto: GetDishesDto): Promise<GetDishes> {
      return await repository.getAll(getDishesDto);
    },
  };
};
