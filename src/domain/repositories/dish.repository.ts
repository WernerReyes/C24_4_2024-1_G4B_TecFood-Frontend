import type {
  CreateDishResponse,
  DishModel,
  GetDishByIdResponse,
  GetDishesResponse,
  GetDishesToSearchResponse,
  GetDishesWithoutSelectedDishResponse,
} from "@/model";
import type {
  CreateDishDto,
  GetDishesDto,
  GetDishesWithoutSelectedDishDto,
  UploadImageDto,
} from "../dtos";

export abstract class DishRepository {
  abstract create(
    createDishDto: CreateDishDto,
    uploadDishImages: UploadImageDto,
  ): Promise<CreateDishResponse<DishModel>>;
  abstract getAll(
    getDishesDto: GetDishesDto,
  ): Promise<GetDishesResponse<DishModel>>;
  abstract getAllToSearch(): Promise<GetDishesToSearchResponse<DishModel>>;
  abstract getAllWithoutSelectedDish(
    getDishesWithoutSelectedDishDto: GetDishesWithoutSelectedDishDto,
  ): Promise<GetDishesWithoutSelectedDishResponse<DishModel>>;
  abstract getById(id: number): Promise<GetDishByIdResponse<DishModel>>;
}
