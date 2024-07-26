import type { DishCategoryModel } from "@/model";
import type {
  ApiResponse,
  CreateDishCategoryRequest,
  UpdateDishCategoryImageRequest,
  UpdateDishCategoryRequest,
  UploadImageRequest,
} from "../dtos";

export abstract class DishCategoryRepository {
  abstract create(
    createDishCategoryRequest: CreateDishCategoryRequest,
    uploadImageRequest: UploadImageRequest,
  ): Promise<ApiResponse<DishCategoryModel>>;
  abstract update(
    updateDishCategoryRequest: UpdateDishCategoryRequest,
  ): Promise<ApiResponse<DishCategoryModel>>;
  abstract updateImage(
    updateDishCategoryImageRequest: UpdateDishCategoryImageRequest,
  ): Promise<ApiResponse<DishCategoryModel>>;
  abstract delete(dishCategoryId: number): Promise<ApiResponse<void>>;
  abstract deleteMany(dishCategoryIds: number[]): Promise<ApiResponse<void>>;
  abstract getAll(): Promise<ApiResponse<DishCategoryModel[]>>;
}
