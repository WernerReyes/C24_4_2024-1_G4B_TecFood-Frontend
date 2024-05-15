import type { GetDishesResponse } from "@/domain/entities";
import type { GetDishes } from "@/model";
import { dishAdapter } from "@/config/adapters";
import { httpRequest } from "@/config/api";

const baseUrl = "/dish";

export const getDishes = async (): Promise<GetDishes> => {
  try {
    const { data } = await httpRequest<GetDishesResponse>(baseUrl, "GET");
    return { ...data, dishes: data.dishes.map(dishAdapter) };
  } catch (error) {
    throw error;
  }
};
