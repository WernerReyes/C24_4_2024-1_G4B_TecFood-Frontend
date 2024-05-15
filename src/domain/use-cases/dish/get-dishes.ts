import type { DishRepository } from "@/domain/interfaces";
import type { GetDishes } from "@/model";

interface GetDishesUseCase {
  execute(): Promise<GetDishes>;
}

export const getDishes = (repository: DishRepository): GetDishesUseCase => {
  return {
    async execute(): Promise<GetDishes> {
      return await repository.getAll();
    },
  };
};
