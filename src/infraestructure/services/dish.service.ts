import type { GetDishesResponse } from "@/domain/entities";
import type { GetDishesModel } from "@/model";
import { GetDishesDto } from "@/domain/dtos";
import { dishAdapter } from "@/config/adapters";
import { httpRequest } from "@/config/api";
import { convertToRequestParam } from "@/presentation/utilities";

interface IDishService {
  getAll(getDishesDto: GetDishesDto): Promise<GetDishesModel>;
}

export class DishService implements IDishService {
  private baseUrl = "/dish";

  public async getAll(getDishesDto: GetDishesDto): Promise<GetDishesModel> {
    try {
      const requestParam = convertToRequestParam(getDishesDto);
      const { data } = await httpRequest<GetDishesResponse>(
        this.baseUrl + requestParam,
        "GET",
      );
      return { ...data, dishes: data.dishes.map(dishAdapter) };
    } catch (error) {
      throw error;
    }
  }
}
