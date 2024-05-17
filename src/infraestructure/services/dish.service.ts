import type { GetDishesResponse } from "@/domain/entities";
import type { GetDishes } from "@/model";
import type { GetDishesDto } from "@/domain/dtos";
import { dishAdapter } from "@/config/adapters";
import { httpRequest } from "@/config/api";
import { convertToRequestParam } from "@/presentation/utilities";

const baseUrl = "/dish";

export const getDishes = async (
  getDishesDto: GetDishesDto,
): Promise<GetDishes> => {
  try {
    const requestParam = convertToRequestParam(getDishesDto);
    const { data } = await httpRequest<GetDishesResponse>(
      baseUrl + requestParam,
      "GET",
    );
    return { ...data, dishes: data.dishes.map(dishAdapter) };
  } catch (error) {
    throw error;
  }
};
