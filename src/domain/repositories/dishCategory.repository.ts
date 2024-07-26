import type {
  DishCategoryModel
} from "@/model";
import type {
  ApiResponse,
  CreateDishCategoryRequest,
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
  abstract getAll(): Promise<ApiResponse<DishCategoryModel[]>>;
  //   create: (dishOffer: CreateDishOffer) => Promise<DishOffer>;
  //   update: (dishOffer: UpdateDishOffer) => Promise<DishOffer>;
  //   delete: (id: string) => Promise<void>;
}
