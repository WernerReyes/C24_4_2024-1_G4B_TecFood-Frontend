import { dishAdapter, dishImageAdapter } from "@/config/adapters";
import { httpRequest } from "@/config/api";
import type {
  ApiResponse,
  CreateDishRequest,
  GetDishesRequest,
  GetDishesWithoutSelectedDishRequest,
  PagedResponse,
  UpdateDishRequest,
  UpdateDishImageRequest,
  UploadImageRequest,
  UpdateStatusRequest,
  PutDishOfferRequest,
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
    createDishRequest: CreateDishRequest,
    uploadDishImages: UploadImageRequest,
  ): Promise<ApiResponse<DishModel>>;
  putOffer(
    putDishOfferRequest: PutDishOfferRequest,
  ): Promise<ApiResponse<DishModel>>;
  deleteOffer(dishId: number): Promise<ApiResponse<DishModel>>;
  deleteManyOffers(dishIds: number[]): Promise<ApiResponse<DishModel[]>>;
  update(updateDishRequest: UpdateDishRequest): Promise<ApiResponse<DishModel>>;
  updateImage(
    updateDishImageRequest: UpdateDishImageRequest,
  ): Promise<ApiResponse<DishImageModel[]>>;
  updateStatus(
    updateStatusRequest: UpdateStatusRequest,
  ): Promise<ApiResponse<DishModel>>;
  delete(id: number): Promise<ApiResponse<void>>;
  deleteMany(ids: number[]): Promise<ApiResponse<void>>;
  getAllPaginated(
    getDishesRequest: GetDishesRequest,
  ): Promise<ApiResponse<PagedResponse<DishModel[]>>>;
  getAll(): Promise<ApiResponse<DishModel[]>>;
  getAllPublished(): Promise<ApiResponse<DishModel[]>>;
  getAllWithoutSelectedDish(
    getDishesWithoutSelectedDishRequest: GetDishesWithoutSelectedDishRequest,
  ): Promise<ApiResponse<DishModel[]>>;
  getById(id: number): Promise<ApiResponse<DishModel>>;
}

export class DishService implements IDishService {
  private prefix: string;

  constructor() {
    this.prefix = "/dish";
  }

  public async create(
    createDishRequest: CreateDishRequest,
    uploadDishImages: UploadImageRequest,
  ) {
    try {
      const formData = new FormData();
      createDishRequest.toFormData.forEach((value, key) =>
        formData.append(key, value),
      );
      uploadDishImages.toFormData.forEach((value, key) =>
        formData.append(key, value),
      );

      const { data, ...rest } = await httpRequest.post<DishEntity>(
        this.prefix,
        formData,
      );

      return { ...rest, data: dishAdapter(data) };
    } catch (error) {
      throw error;
    }
  }

  public async putOffer(putDishOfferRequest: PutDishOfferRequest) {
    try {
      const { data, ...rest } = await httpRequest.put<DishEntity>(
        `${this.prefix}/offer`,
        putDishOfferRequest,
      );
      return { ...rest, data: dishAdapter(data) };
    } catch (error) {
      throw error;
    }
  }

  public async deleteOffer(dishId: number) {
    try {
      const { data, ...rest } = await httpRequest.delete<DishEntity>(
        `${this.prefix}/offer/${dishId}`,
      );
      return { ...rest, data: dishAdapter(data) };
    } catch (error) {
      throw error;
    }
  }

  public async deleteManyOffers(dishIds: number[]) {
    try {
      const requestParamIds = convertSimpleArrayToRequestParam(
        dishIds,
        "dishesId",
      );
      const requestParams = concatRequestParams([requestParamIds]);
      console.log(requestParams);
      const { data, ...rest } = await httpRequest.delete<DishEntity[]>(
        `${this.prefix}/offer/delete-many${requestParams}`,
      );
      return { ...rest, data: data.map(dishAdapter) };
    } catch (error) {
      throw error;
    }
  }

  public async update(updateDishRequest: UpdateDishRequest) {
    try {
      const { data, ...rest } = await httpRequest.put<DishEntity>(
        this.prefix,
        updateDishRequest.toRequestBody,
      );

      return { ...rest, data: dishAdapter(data) };
    } catch (error) {
      throw error;
    }
  }

  public async updateStatus(updateStatusRequest: UpdateStatusRequest) {
    try {
      const { data, ...rest } = await httpRequest.put<DishEntity>(
        `${this.prefix}/status`,
        updateStatusRequest,
      );
      return { ...rest, data: dishAdapter(data) };
    } catch (error) {
      throw error;
    }
  }

  public async delete(id: number) {
    try {
      return await httpRequest.delete<void>(`${this.prefix}/${id}`);
    } catch (error) {
      throw error;
    }
  }

  public async deleteMany(ids: number[]) {
    try {
      const requestParamIds = convertSimpleArrayToRequestParam(ids, "dishesId");
      const requestParams = concatRequestParams([requestParamIds]);
      return await httpRequest.delete<void>(
        `${this.prefix}/delete-many${requestParams}`,
      );
    } catch (error) {
      throw error;
    }
  }
  public async updateImage(updateDishImageRequest: UpdateDishImageRequest) {
    try {
      const formData = updateDishImageRequest.toFormData;
      const { data, ...rest } = await httpRequest.put<DishImageEntity[]>(
        `${this.prefix}/image`,
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
  }: GetDishesRequest) {
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

      const { data, ...restResponse } = await httpRequest.get<
        PagedResponse<DishEntity[]>
      >(`${this.prefix}/all-paginated${requestParams}`);
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
      const { data, ...rest } = await httpRequest.get<DishEntity[]>(
        this.prefix,
      );
      return { ...rest, data: data.map(dishAdapter) };
    } catch (error) {
      throw error;
    }
  }

  public async getAllPublished() {
    try {
      const { data, ...rest } = await httpRequest.get<DishEntity[]>(
        `${this.prefix}/published`,
      );
      return { ...rest, data: data.map(dishAdapter) };
    } catch (error) {
      throw error;
    }
  }

  public async getAllWithoutSelectedDish({
    idDish,
    limit,
  }: GetDishesWithoutSelectedDishRequest) {
    try {
      const requestParam = convertToRequestParam({ limit });
      const { data, ...rest } = await httpRequest.get<DishEntity[]>(
        `${this.prefix}/without/${idDish}?${requestParam}`,
      );
      return { ...rest, data: data.map(dishAdapter) };
    } catch (error) {
      throw error;
    }
  }

  public async getById(id: number) {
    try {
      const { data, ...rest } = await httpRequest.get<DishEntity>(
        `${this.prefix}/${id}`,
      );
      return { ...rest, data: dishAdapter(data) };
    } catch (error) {
      throw error;
    }
  }
}
