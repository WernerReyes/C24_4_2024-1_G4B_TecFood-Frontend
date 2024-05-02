import { DishOffer } from "@/model";

export interface DishOfferRepository {
  getAll: () => Promise<DishOffer[]>;
  //   create: (dishOffer: CreateDishOffer) => Promise<DishOffer>;
  //   update: (dishOffer: UpdateDishOffer) => Promise<DishOffer>;
  //   delete: (id: string) => Promise<void>;
}
