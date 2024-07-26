import { dishAdapter, dishImageAdapter } from "@/config/adapters";
import { httpRequest } from "@/config/api";
import type {
  ApiResponse,
  CreateDishDto,
  GetDishesDto,
  GetDishesWithoutSelectedDishDto,
  PagedResponse,
  UpdateDishDto,
  UpdateDishImageDto,
  UploadImageDto,
} from "@/domain/dtos";
import type { DishEntity, DishImageEntity } from "@/domain/entities";
import type { DishImageModel, DishModel } from "@/model";
import {
  concatRequestParams,
  convertArrayToRequestParam,
  convertSimpleArrayToRequestParam,
  convertToRequestParam,
} from "@/presentation/utilities";

interface IDishService {
  create(
    createDishDto: CreateDishDto,
    uploadDishImages: UploadImageDto,
  ): Promise<ApiResponse<DishModel>>;
  update(updateDishDto: UpdateDishDto): Promise<ApiResponse<DishModel>>;
  updateImage(
    updateDishImageDto: UpdateDishImageDto,
  ): Promise<ApiResponse<DishImageModel[]>>;
  delete(id: number): Promise<ApiResponse<void>>;
  deleteMany(ids: number[]): Promise<ApiResponse<void>>;
  getAllPaginated(
    getDishesDto: GetDishesDto,
  ): Promise<ApiResponse<PagedResponse<DishModel[]>>>;
  getAll(): Promise<ApiResponse<DishModel[]>>;
  getAllWithoutSelectedDish(
    getDishesWithoutSelectedDishDto: GetDishesWithoutSelectedDishDto,
  ): Promise<ApiResponse<DishModel[]>>;
  getById(id: number): Promise<ApiResponse<DishModel>>;
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

      const { data, ...rest } = await httpRequest<DishEntity>(
        this.prefix,
        "POST",
        formData,
      );

      return { ...rest, data: dishAdapter(data) };
    } catch (error) {
      throw error;
    }
  }

  public async update(updateDishDto: UpdateDishDto) {
    try {
      const { data, ...rest } = await httpRequest<DishEntity>(
        this.prefix + "/update",
        "PUT",
        updateDishDto.toRequestBody,
      );

      return { ...rest, data: dishAdapter(data) };
    } catch (error) {
      throw error;
    }
  }

  public async delete(id: number) {
    try {
      return await httpRequest<void>(this.prefix + "/" + id, "DELETE");
    } catch (error) {
      throw error;
    }
  }

  public async deleteMany(ids: number[]) {
    try {
      const requestParamIds = convertSimpleArrayToRequestParam(ids, "dishesId");
      const requestParams = concatRequestParams([requestParamIds]);
      return await httpRequest<void>(
        this.prefix + "/delete-many" + requestParams,
        "DELETE",
      );
    } catch (error) {
      throw error;
    }
  }
  public async updateImage(updateDishImageDto: UpdateDishImageDto) {
    try {
      const formData = updateDishImageDto.toFormData;
      const { data, ...rest } = await httpRequest<DishImageEntity[]>(
        this.prefix + "/image",
        "PUT",
        formData,
      );
      return { ...rest, data: data.map(dishImageAdapter) };
    } catch (error) {
      throw error;
    }
  }

  public async getAllPaginated({
    priceRange,
    idCategory,
    ...rest
  }: GetDishesDto) {
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

      const { data, ...restResponse } = await httpRequest<
        PagedResponse<DishEntity[]>
      >(this.prefix + "/all-paginated" + requestParams, "GET");
      return {
        ...restResponse,
        data: { ...data, content: data.content.map(dishAdapter) },
      };
    } catch (error) {
      throw error;
    }
  }

  public async getAll() {
    try {
      const { data, ...rest } = await httpRequest<DishEntity[]>(
        this.prefix,
        "GET",
      );
      return { ...rest, data: data.map(dishAdapter) };
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
      const { data, ...rest } = await httpRequest<DishEntity[]>(
        this.prefix + "/without/" + idDish + "?" + requestParam,
        "GET",
      );
      return { ...rest, data: data.map(dishAdapter) };
    } catch (error) {
      throw error;
    }
  }

  public async getById(id: number) {
    try {
      const { data, ...rest } = await httpRequest<DishEntity>(
        this.prefix + "/" + id,
        "GET",
      );
      return { ...rest, data: dishAdapter(data) };
    } catch (error) {
      throw error;
    }
  }
}
