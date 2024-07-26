import type {
  DishCategoryModel
} from "@/model";
import type {
  ApiResponse,
  CreateDishCategoryDto,
  UpdateDishCategoryDto,
  UploadImageDto,
} from "../dtos";

export abstract class DishCategoryRepository {
  abstract create(
    createDishCategoryDto: CreateDishCategoryDto,
    uploadImageDto: UploadImageDto,
  ): Promise<ApiResponse<DishCategoryModel>>;
  abstract update(
    updateDishCategoryDto: UpdateDishCategoryDto,
  ): Promise<ApiResponse<DishCategoryModel>>;
  abstract getAll(): Promise<ApiResponse<DishCategoryModel[]>>;
  //   create: (dishOffer: CreateDishOffer) => Promise<DishOffer>;
  //   update: (dishOffer: UpdateDishOffer) => Promise<DishOffer>;
  //   delete: (id: string) => Promise<void>;
}
