import { httpRequest } from "@/config/api";
import { DishOffer } from "@/model";

const baseUrl = "/dishOffers";

export const getAllDishOffers = async (): Promise<DishOffer[]> => {
  try {
    const { data } = await httpRequest<DishOffer[]>(baseUrl, "GET");
    return data;
  } catch (error) {
    throw error;
  }
};
