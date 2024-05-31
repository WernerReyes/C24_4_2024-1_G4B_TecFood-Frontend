import type {
  GetDishesResponse,
  GetDishesToSearchResponse,
} from "@/domain/entities";
import type { GetDishesModel, GetDishesToSearchModel } from "@/model";
import { GetDishesDto } from "@/domain/dtos";
import { dishAdapter } from "@/config/adapters";
import { httpRequest } from "@/config/api";
import {
  convertToRequestParam,
  convertArrayToRequestParam,
  concatRequestParams,
} from "@/presentation/utilities";

interface IDishService {
  getAll(getDishesDto: GetDishesDto): Promise<GetDishesModel>;
  getAllToSearch(): Promise<GetDishesToSearchModel>;
}

export class DishService implements IDishService {
  private baseUrl = "/dish";

  public async getAll({
    priceRange,
    idCategory,
    ...rest
  }: GetDishesDto): Promise<GetDishesModel> {
    try {
      const requestParam = convertToRequestParam(rest);
      const requestParamPriceRange = convertToRequestParam(priceRange!);
      const requestParamCategory = convertArrayToRequestParam(
        idCategory,
        "idCategory",
      );

      const requestParams = concatRequestParams([
        requestParam,
        requestParamPriceRange,
        requestParamCategory,
      ]);

      const { data } = await httpRequest<GetDishesResponse>(
        this.baseUrl + requestParams,
        "GET",
      );
      return { ...data, dishes: data.dishes.map(dishAdapter) };
    } catch (error) {
      throw error;
    }
  }

  public async getAllToSearch(): Promise<GetDishesToSearchModel> {
    try {
      const { data } = await httpRequest<GetDishesToSearchResponse>(
        this.baseUrl + "/search",
        "GET",
      );
      return { ...data, dishes: data.dishes.map(dishAdapter) };
    } catch (error) {
      throw error;
    }
  }
}
