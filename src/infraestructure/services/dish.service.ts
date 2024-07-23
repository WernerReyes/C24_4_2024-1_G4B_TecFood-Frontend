import type { DishEntity, DishImageEntity } from "@/domain/entities";
import type {
  CreateDishResponse,
  DeleteDishResponse,
  DishImageModel,
  DishModel,
  GetDishByIdResponse,
  GetDishesResponse,
  GetDishesToSearchResponse,
  GetDishesWithoutSelectedDishResponse,
  UpdateDishImageResponse,
  UpdateDishResponse,
} from "@/model";
import type {
  CreateDishDto,
  GetDishesDto,
  GetDishesWithoutSelectedDishDto,
  UpdateDishDto,
  UpdateDishImageDto,
  UploadImageDto,
} from "@/domain/dtos";
import { dishAdapter, dishImageAdapter } from "@/config/adapters";
import { httpRequest } from "@/config/api";
import {
  convertToRequestParam,
  convertArrayToRequestParam,
  concatRequestParams,
  convertSimpleArrayToRequestParam,
} from "@/presentation/utilities";

interface IDishService {
  create(
    createDishDto: CreateDishDto,
    uploadDishImages: UploadImageDto,
  ): Promise<CreateDishResponse<DishModel>>;
  update(updateDishDto: UpdateDishDto): Promise<UpdateDishResponse<DishModel>>;
  updateImage(
    updateDishImageDto: UpdateDishImageDto,
  ): Promise<UpdateDishImageResponse<DishImageModel>>;
  delete(id: number): Promise<DeleteDishResponse>;
  deleteMany(ids: number[]): Promise<DeleteDishResponse>;
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
  ) {
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

  public async update(updateDishDto: UpdateDishDto) {
    try {
      const { data } = await httpRequest<UpdateDishResponse<DishEntity>>(
        this.prefix + "/update",
        "PUT",
        updateDishDto.toRequestBody,
      );

      console.log("formData", updateDishDto.toRequestBody);
      return { ...data, dish: dishAdapter(data.dish) };
    } catch (error) {
      throw error;
    }
  }

  public async delete(id: number) {
    try {
      const { data } = await httpRequest<DeleteDishResponse>(
        this.prefix + "/" + id,
        "DELETE",
      );
      return { ...data };
    } catch (error) {
      throw error;
    }
  }

  public async deleteMany(ids: number[]) {
    try {
      const requestParamIds = convertSimpleArrayToRequestParam(ids, "dishesId");
      const requestParams = concatRequestParams([requestParamIds]);;
      const { data } = await httpRequest<DeleteDishResponse>(
        this.prefix + "/delete-many" + requestParams,
        "DELETE",
      );
      return { ...data };
    } catch (error) {
      throw error;
    }
  }
  public async updateImage(updateDishImageDto: UpdateDishImageDto) {
    try {
      const formData = updateDishImageDto.toFormData;
      const { data } = await httpRequest<
        UpdateDishImageResponse<DishImageEntity>
      >(this.prefix + "/image", "PUT", formData);
      return { ...data, dishImages: data.dishImages.map(dishImageAdapter) };
    } catch (error) {
      throw error;
    }
  }

  public async getAll({ priceRange, idCategory, ...rest }: GetDishesDto) {
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

  public async getAllToSearch() {
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
  }: GetDishesWithoutSelectedDishDto) {
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

  public async getById(id: number) {
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
