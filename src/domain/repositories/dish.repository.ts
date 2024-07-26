import type {
  ApiResponse,
  CreateDishDto,
  GetDishesDto,
  GetDishesWithoutSelectedDishDto,
  PagedResponse,
  UpdateDishDto,
  UpdateDishImageDto,
  UploadImageDto,
} from "../dtos";
import type { DishImageModel, DishModel } from "@/model";

export abstract class DishRepository {
  abstract create(
    createDishDto: CreateDishDto,
    uploadDishImages: UploadImageDto,
  ): Promise<ApiResponse<DishModel>>;
  abstract update(
    updateDishDto: UpdateDishDto,
  ): Promise<ApiResponse<DishModel>>;
  abstract updateImage(
    updateDishImageDto: UpdateDishImageDto,
  ): Promise<ApiResponse<DishImageModel[]>>;
  abstract delete(id: number): Promise<ApiResponse<void>>;
  abstract deleteMany(ids: number[]): Promise<ApiResponse<void>>;
  abstract getAllPaginated(
    getDishesDto: GetDishesDto,
  ): Promise<ApiResponse<PagedResponse<DishModel[]>>>;
  abstract getAll(): Promise<ApiResponse<DishModel[]>>;
  abstract getAllWithoutSelectedDish(
    getDishesWithoutSelectedDishDto: GetDishesWithoutSelectedDishDto,
  ): Promise<ApiResponse<DishModel[]>>;
  abstract getById(id: number): Promise<ApiResponse<DishModel>>;
}
