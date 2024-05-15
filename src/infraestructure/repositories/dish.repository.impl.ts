import type { DishRepository } from "@/domain/interfaces";
import { getDishes } from "../services";

export const dishRepositoryImpl: DishRepository = {
  getAll: async () => getDishes(),
};
