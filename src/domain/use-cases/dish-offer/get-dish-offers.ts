import { DishOfferRepository } from "@/domain/interfaces";
import { DishOffer } from "@/model";

interface GetDishOffersUseCase {
  execute(): Promise<DishOffer[]>;
}

export const getDishOffers = (
  repository: DishOfferRepository,
): GetDishOffersUseCase => {
  return {
    async execute(): Promise<DishOffer[]> {
      return await repository.getAll();
    },
  };
};
