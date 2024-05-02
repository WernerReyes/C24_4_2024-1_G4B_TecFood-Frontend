import { DishOfferRepository } from "@/domain/interfaces";
import { getAllDishOffers } from "../services";

export const dishOfferRepositoryImpl: DishOfferRepository = {
  getAll: async () => getAllDishOffers(),
};
