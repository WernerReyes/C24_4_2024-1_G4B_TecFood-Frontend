import type {
  GetDishByIdModel,
  GetDishesModel,
  GetDishesToSearchModel,
  GetDishesWithoutSelectedDishModel,
} from "@/model";
import type { GetDishesDto, GetDishesWithoutSelectedDishDto } from "../dtos";

export interface DishRepository {
  getAll: (getDishesDto: GetDishesDto) => Promise<GetDishesModel>;
  getAllToSearch: () => Promise<GetDishesToSearchModel>;
  getAllWithoutSelectedDish(
    getDishesWithoutSelectedDishDto: GetDishesWithoutSelectedDishDto,
  ): Promise<GetDishesWithoutSelectedDishModel>;
  getById: (id: number) => Promise<GetDishByIdModel>;
  //   create: (dishOffer: CreateDishOffer) => Promise<DishOffer>;
  //   update: (dishOffer: UpdateDishOffer) => Promise<DishOffer>;
  //   delete: (id: string) => Promise<void>;
}
