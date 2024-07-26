import type { DishOffer } from "@/model";
import { httpRequest } from "@/config/api";

const baseUrl = "/dishOffers";

export const getAllDishOffers = async (): Promise<DishOffer[]> => {
  try {
    const { data } = await httpRequest.get<DishOffer[]>(baseUrl);
    return data;
  } catch (error) {
    throw error;
  }
};
