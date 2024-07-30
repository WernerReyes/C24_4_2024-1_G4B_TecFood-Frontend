import { dishCategoryAdapter } from "@/config/adapters";
import { httpRequest } from "@/config/api";
import {
  ApiResponse,
  CreateDishCategoryRequest,
  UpdateDishCategoryImageRequest,
  UpdateDishCategoryRequest,
  UpdateStatusRequest,
  UploadImageRequest,
} from "@/domain/dtos";
import type { DishCategoryEntity } from "@/domain/entities";
import type { DishCategoryModel } from "@/model";
import { convertToRequestParam } from "@/presentation/utilities";

interface IDishCategoryService {
  create(
    createDishCategoryRequest: CreateDishCategoryRequest,
    uploadImageRequest: UploadImageRequest,
  ): Promise<ApiResponse<DishCategoryModel>>;
  update(
    updateDishCategoryRequest: UpdateDishCategoryRequest,
  ): Promise<ApiResponse<DishCategoryModel>>;
  updateImage(
    updateDishCategoryImageRequest: UpdateDishCategoryImageRequest,
  ): Promise<ApiResponse<DishCategoryModel>>;
  updateStatus(
    updateStatusRequest: UpdateStatusRequest,
  ): Promise<ApiResponse<DishCategoryModel>>;
  delete(dishCategoryId: number): Promise<ApiResponse<void>>;
  deleteMany(dishCategoryIds: number[]): Promise<ApiResponse<void>>;
  getAll(): Promise<ApiResponse<DishCategoryModel[]>>;
  getAllPublished(): Promise<ApiResponse<DishCategoryModel[]>>;
}

export class DishCategoryService implements IDishCategoryService {
  private prefix: string;

  constructor() {
    this.prefix = "/dish-category";
  }

  public async create(
    createDishCategoryRequest: CreateDishCategoryRequest,
    uploadImageRequest: UploadImageRequest,
  ) {
    try {
      const formData = new FormData();
      createDishCategoryRequest.toFormData.forEach((value, key) =>
        formData.append(key, value),
      );

      uploadImageRequest.toFormData.forEach((value, key) =>
        formData.append(key, value),
      );

      const { data, ...rest } = await httpRequest.post<DishCategoryEntity>(
        this.prefix,
        formData,
      );
      return {
        data: dishCategoryAdapter(data),
        ...rest,
      };
    } catch (error) {
      throw error;
    }
  }

  public async update(updateDishCategoryRequest: UpdateDishCategoryRequest) {
    try {
      const { data, ...rest } = await httpRequest.put<DishCategoryEntity>(
        this.prefix,
        updateDishCategoryRequest,
      );
      return {
        data: dishCategoryAdapter(data),
        ...rest,
      };
    } catch (error) {
      throw error;
    }
  }

  public async updateImage(
    updateDishCategoryImageRequest: UpdateDishCategoryImageRequest,
  ) {
    try {
      const params = convertToRequestParam({
        dishCategoryId: updateDishCategoryImageRequest.dishCategoryId,
      });
      const { data, ...rest } = await httpRequest.put<DishCategoryEntity>(
        `${this.prefix}/image?${params}`,
        updateDishCategoryImageRequest.toFormData,
      );
      return {
        data: dishCategoryAdapter(data),
        ...rest,
      };
    } catch (error) {
      throw error;
    }
  }

  public async updateStatus(updateStatusRequest: UpdateStatusRequest) {
    try {
      const { data, ...rest } = await httpRequest.put<DishCategoryEntity>(
        `${this.prefix}/status`,
        updateStatusRequest,
      );
      return {
        data: dishCategoryAdapter(data),
        ...rest,
      };
    } catch (error) {
      throw error;
    }
  }

  public async delete(dishCategoryId: number) {
    try {
      return await httpRequest.delete<void>(`${this.prefix}/${dishCategoryId}`);
    } catch (error) {
      throw error;
    }
  }

  public async deleteMany(dishCategoryIds: number[]) {
    try {
      const params = convertToRequestParam({ dishCategoryIds });
      return await httpRequest.delete<void>(
        `${this.prefix}/delete-many?${params}`,
      );
    } catch (error) {
      throw error;
    }
  }

  public async getAll() {
    try {
      const { data, ...rest } = await httpRequest.get<DishCategoryEntity[]>(
        this.prefix,
      );
      return {
        data: data.map(dishCategoryAdapter),
        ...rest,
      };
    } catch (error) {
      throw error;
    }
  }

  public async getAllPublished() {
    try {
      const { data, ...rest } = await httpRequest.get<DishCategoryEntity[]>(
        `${this.prefix}/published`,
      );
      return {
        data: data.map(dishCategoryAdapter),
        ...rest,
      };
    } catch (error) {
      throw error;
    }
  }
}
