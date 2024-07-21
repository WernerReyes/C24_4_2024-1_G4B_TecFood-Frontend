import type {
  CreateDishResponse,
  DeleteDishResponse,
  DishImageModel,
  DishModel,
  GetDishByIdResponse,
  GetDishesResponse,
  GetDishesToSearchResponse,
  GetDishesWithoutSelectedDishResponse,
  UpdateDishImageResponse,
  UpdateDishResponse,
} from "@/model";
import type {
  CreateDishDto,
  GetDishesDto,
  GetDishesWithoutSelectedDishDto,
  UpdateDishDto,
  UpdateDishImageDto,
  UploadImageDto,
} from "../dtos";

export abstract class DishRepository {
  abstract create(
    createDishDto: CreateDishDto,
    uploadDishImages: UploadImageDto,
  ): Promise<CreateDishResponse<DishModel>>;
  abstract update(
    updateDishDto: UpdateDishDto,
  ): Promise<UpdateDishResponse<DishModel>>;
  abstract updateImage(
    updateDishImageDto: UpdateDishImageDto,
  ): Promise<UpdateDishImageResponse<DishImageModel>>;
  abstract delete(id: number): Promise<DeleteDishResponse>;
  abstract deleteMany(ids: number[]): Promise<DeleteDishResponse>;
  abstract getAll(
    getDishesDto: GetDishesDto,
  ): Promise<GetDishesResponse<DishModel>>;
  abstract getAllToSearch(): Promise<GetDishesToSearchResponse<DishModel>>;
  abstract getAllWithoutSelectedDish(
    getDishesWithoutSelectedDishDto: GetDishesWithoutSelectedDishDto,
  ): Promise<GetDishesWithoutSelectedDishResponse<DishModel>>;
  abstract getById(id: number): Promise<GetDishByIdResponse<DishModel>>;
}
