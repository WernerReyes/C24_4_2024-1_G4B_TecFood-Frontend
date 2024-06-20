import { DishOfferRepository } from "@/domain/repositories";
import { getAllDishOffers } from "../services";

export const dishOfferRepositoryImpl: DishOfferRepository = {
  getAll: async () => getAllDishOffers(),
};
