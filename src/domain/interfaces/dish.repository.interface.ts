import type { GetDishesModel, GetDishesToSearchModel } from "@/model";
import type { GetDishesDto } from "../dtos";

export interface DishRepository {
  getAll: (getDishesDto: GetDishesDto) => Promise<GetDishesModel>;
  getAllToSearch: () => Promise<GetDishesToSearchModel>;
  //   create: (dishOffer: CreateDishOffer) => Promise<DishOffer>;
  //   update: (dishOffer: UpdateDishOffer) => Promise<DishOffer>;
  //   delete: (id: string) => Promise<void>;
}
