import type { GetDishCategories } from "@/model";

export interface DishCategoryRepository {
  getAll: () => Promise<GetDishCategories>;
  //   create: (dishOffer: CreateDishOffer) => Promise<DishOffer>;
  //   update: (dishOffer: UpdateDishOffer) => Promise<DishOffer>;
  //   delete: (id: string) => Promise<void>;
}
