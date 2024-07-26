import { dishCategoryAdapter } from "@/config/adapters";
import { httpRequest } from "@/config/api";
import {
  ApiResponse,
  CreateDishCategoryDto,
  UpdateDishCategoryDto,
  UploadImageDto,
} from "@/domain/dtos";
import type { DishCategoryEntity } from "@/domain/entities";
import type {
  DishCategoryModel
} from "@/model";

interface IDishCategoryService {
  create(
    createDishCategoryDto: CreateDishCategoryDto,
    uploadImageDto: UploadImageDto,
  ): Promise<ApiResponse<DishCategoryModel>>;
  update(
    updateDishCategoryDto: UpdateDishCategoryDto,
  ): Promise<ApiResponse<DishCategoryModel>>;
  getAll(): Promise<ApiResponse<DishCategoryModel[]>>;
}

export class DishCategoryService implements IDishCategoryService {
  private prefix: string;

  constructor() {
    this.prefix = "/dish-category";
  }

  public async create(
    createDishCategoryDto: CreateDishCategoryDto,
    uploadImageDto: UploadImageDto,
  ) {
    try {
      const formData = new FormData();
      createDishCategoryDto.toFormData.forEach((value, key) =>
        formData.append(key, value),
      );

      uploadImageDto.toFormData.forEach((value, key) =>
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

  public async update(updateDishCategoryDto: UpdateDishCategoryDto) {
    try {
      const { data, ...rest } = await httpRequest<DishCategoryEntity>(
        this.prefix,
        "PUT",
        updateDishCategoryDto,
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
      return {
        data: data.map(dishCategoryAdapter),
        ...rest,
      };
    } catch (error) {
      throw error;
    }
  }
}
