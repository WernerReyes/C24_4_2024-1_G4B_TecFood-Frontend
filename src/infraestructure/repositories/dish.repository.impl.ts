import type { DishRepository } from "@/domain/interfaces";
import type { GetDishesDto } from "@/domain/dtos";
import { getDishes } from "../services";

export const dishRepositoryImpl: DishRepository = {
  getAll: async (getDishesDto: GetDishesDto) => getDishes(getDishesDto),
};
