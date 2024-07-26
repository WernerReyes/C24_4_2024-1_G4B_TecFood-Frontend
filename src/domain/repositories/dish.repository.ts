import type {
  ApiResponse,
  CreateDishRequest,
  GetDishesRequest,
  GetDishesWithoutSelectedDishRequest,
  PagedResponse,
  UpdateDishRequest,
  UpdateDishImageRequest,
  UploadImageRequest,
} from "../dtos";
import type { DishImageModel, DishModel } from "@/model";

export abstract class DishRepository {
  abstract create(
    createDishRequest: CreateDishRequest,
    uploadDishImages: UploadImageRequest,
  ): Promise<ApiResponse<DishModel>>;
  abstract update(
    updateDishRequest: UpdateDishRequest,
  ): Promise<ApiResponse<DishModel>>;
  abstract updateImage(
    updateDishImageRequest: UpdateDishImageRequest,
  ): Promise<ApiResponse<DishImageModel[]>>;
  abstract delete(id: number): Promise<ApiResponse<void>>;
  abstract deleteMany(ids: number[]): Promise<ApiResponse<void>>;
  abstract getAllPaginated(
    getDishesRequest: GetDishesRequest,
  ): Promise<ApiResponse<PagedResponse<DishModel[]>>>;
  abstract getAll(): Promise<ApiResponse<DishModel[]>>;
  abstract getAllWithoutSelectedDish(
    getDishesWithoutSelectedDishRequest: GetDishesWithoutSelectedDishRequest,
  ): Promise<ApiResponse<DishModel[]>>;
  abstract getById(id: number): Promise<ApiResponse<DishModel>>;
}
