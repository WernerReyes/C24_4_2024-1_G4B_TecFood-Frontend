import type { GetDishes } from "@/model";
import type { GetDishesDto } from "../dtos";

export interface DishRepository {
  getAll: (getDishesDto: GetDishesDto) => Promise<GetDishes>;
  //   create: (dishOffer: CreateDishOffer) => Promise<DishOffer>;
  //   update: (dishOffer: UpdateDishOffer) => Promise<DishOffer>;
  //   delete: (id: string) => Promise<void>;
}
