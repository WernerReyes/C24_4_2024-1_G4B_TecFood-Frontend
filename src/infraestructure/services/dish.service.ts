import type {
  GetDishByIdResponse,
  GetDishesResponse,
  GetDishesToSearchResponse,
} from "@/domain/entities";
import type {
  GetDishByIdModel,
  GetDishesModel,
  GetDishesToSearchModel,
} from "@/model";
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
  getById(id: number): Promise<GetDishByIdModel>;
}

export class DishService implements IDishService {
  private prefix: string;

  constructor() {
    this.prefix = "/dish";
  }


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
        this.prefix + requestParams,
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
        this.prefix + "/search",
        "GET",
      );
      return { ...data, dishes: data.dishes.map(dishAdapter) };
    } catch (error) {
      throw error;
    }
  }

  public async getById(id: number): Promise<GetDishByIdModel> {
    try {
      const { data } = await httpRequest<GetDishByIdResponse>(
        this.prefix + "/" + id,
        "GET",
      );
      return { ...data, dish: dishAdapter(data.dish) };
    } catch (error) {
      throw error;
    }
  }
}
