import { GetDishes } from "@/model";

export interface DishRepository {
  getAll: () => Promise<GetDishes>;
  //   create: (dishOffer: CreateDishOffer) => Promise<DishOffer>;
  //   update: (dishOffer: UpdateDishOffer) => Promise<DishOffer>;
  //   delete: (id: string) => Promise<void>;
}
