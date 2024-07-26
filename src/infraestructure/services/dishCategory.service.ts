import { dishCategoryAdapter } from "@/config/adapters";
import { httpRequest } from "@/config/api";
import {
  ApiResponse,
  CreateDishCategoryRequest,
  UpdateDishCategoryRequest,
  UploadImageRequest,
} from "@/domain/dtos";
import type { DishCategoryEntity } from "@/domain/entities";
import type {
  DishCategoryModel
} from "@/model";

interface IDishCategoryService {
  create(
    createDishCategoryRequest: CreateDishCategoryRequest,
    uploadImageRequest: UploadImageRequest,
  ): Promise<ApiResponse<DishCategoryModel>>;
  update(
    updateDishCategoryRequest: UpdateDishCategoryRequest,
  ): Promise<ApiResponse<DishCategoryModel>>;
  getAll(): Promise<ApiResponse<DishCategoryModel[]>>;
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

      const { data, ...rest } = await httpRequest<DishCategoryEntity>(
        this.prefix,
        "POST",
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
      const { data, ...rest } = await httpRequest<DishCategoryEntity>(
        this.prefix,
        "PUT",
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

  public async getAll() {
    try {
      const { data, ...rest } = await httpRequest<DishCategoryEntity[]>(
        this.prefix,
        "GET",
      );
      console.log(data);
      return {
        data: data.map(dishCategoryAdapter),
        ...rest,
      };
    } catch (error) {
      throw error;
    }
  }
}
