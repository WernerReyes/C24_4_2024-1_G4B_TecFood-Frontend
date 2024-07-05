import type {
  DishModel,
  GetDishByIdResponse,
  GetDishesResponse,
  GetDishesToSearchResponse,
  GetDishesWithoutSelectedDishResponse,
} from "@/model";
import type { GetDishesDto, GetDishesWithoutSelectedDishDto } from "../dtos";

export abstract class DishRepository {
  abstract getAll(
    getDishesDto: GetDishesDto,
  ): Promise<GetDishesResponse<DishModel>>;
  abstract getAllToSearch(): Promise<GetDishesToSearchResponse<DishModel>>;
  abstract getAllWithoutSelectedDish(
    getDishesWithoutSelectedDishDto: GetDishesWithoutSelectedDishDto,
  ): Promise<GetDishesWithoutSelectedDishResponse<DishModel>>;
  abstract getById(id: number): Promise<GetDishByIdResponse<DishModel>>;
}
