import type { DishEntity } from "@/domain/entities";
import type {
  CreateDishResponse,
  DishModel,
  GetDishByIdResponse,
  GetDishesResponse,
  GetDishesToSearchResponse,
  GetDishesWithoutSelectedDishResponse,
} from "@/model";
import type {
  CreateDishDto,
  GetDishesDto,
  GetDishesWithoutSelectedDishDto,
  UploadImageDto,
} from "@/domain/dtos";
import { dishAdapter } from "@/config/adapters";
import { httpRequest } from "@/config/api";
import {
  convertToRequestParam,
  convertArrayToRequestParam,
  concatRequestParams,
} from "@/presentation/utilities";

interface IDishService {
  create(
    createDishDto: CreateDishDto,
    uploadDishImages: UploadImageDto,
  ): Promise<CreateDishResponse<DishModel>>;
  getAll(getDishesDto: GetDishesDto): Promise<GetDishesResponse<DishModel>>;
  getAllToSearch(): Promise<GetDishesToSearchResponse<DishModel>>;
  getAllWithoutSelectedDish(
    getDishesWithoutSelectedDishDto: GetDishesWithoutSelectedDishDto,
  ): Promise<GetDishesWithoutSelectedDishResponse<DishModel>>;
  getById(id: number): Promise<GetDishByIdResponse<DishModel>>;
}

export class DishService implements IDishService {
  private prefix: string;

  constructor() {
    this.prefix = "/dish";
  }

  public async create(
    createDishDto: CreateDishDto,
    uploadDishImages: UploadImageDto,
  ): Promise<CreateDishResponse<DishModel>> {
    try {
      const formData = new FormData();
      createDishDto.toFormData.forEach((value, key) =>
        formData.append(key, value),
      );
      uploadDishImages.toFormData.forEach((value, key) =>
        formData.append(key, value),
      );

      const { data } = await httpRequest<CreateDishResponse<DishEntity>>(
        this.prefix,
        "POST",
        formData,
      );
      return { ...data, dish: dishAdapter(data.dish) };
    } catch (error) {
      throw error;
    }
  }

  public async getAll({
    priceRange,
    idCategory,
    ...rest
  }: GetDishesDto): Promise<GetDishesResponse<DishModel>> {
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

      const { data } = await httpRequest<GetDishesResponse<DishEntity>>(
        this.prefix + requestParams,
        "GET",
      );
      return { ...data, dishes: data.dishes.map(dishAdapter) };
    } catch (error) {
      throw error;
    }
  }

  public async getAllToSearch(): Promise<GetDishesToSearchResponse<DishModel>> {
    try {
      const { data } = await httpRequest<GetDishesToSearchResponse<DishEntity>>(
        this.prefix + "/search",
        "GET",
      );
      return { ...data, dishes: data.dishes.map(dishAdapter) };
    } catch (error) {
      throw error;
    }
  }

  public async getAllWithoutSelectedDish({
    idDish,
    limit,
  }: GetDishesWithoutSelectedDishDto): Promise<
    GetDishesWithoutSelectedDishResponse<DishModel>
  > {
    try {
      const requestParam = convertToRequestParam({ limit });
      const { data } = await httpRequest<
        GetDishesWithoutSelectedDishResponse<DishEntity>
      >(this.prefix + "/without/" + idDish + "?" + requestParam, "GET");
      return { ...data, dishes: data.dishes.map(dishAdapter) };
    } catch (error) {
      throw error;
    }
  }

  public async getById(id: number): Promise<GetDishByIdResponse<DishModel>> {
    try {
      const { data } = await httpRequest<GetDishByIdResponse<DishEntity>>(
        this.prefix + "/" + id,
        "GET",
      );
      return { ...data, dish: dishAdapter(data.dish) };
    } catch (error) {
      throw error;
    }
  }
}
