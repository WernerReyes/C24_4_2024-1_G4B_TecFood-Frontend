import type { GetDishCategoriesModel } from "@/model";

export interface DishCategoryRepository {
  getAll: () => Promise<GetDishCategoriesModel>;
  //   create: (dishOffer: CreateDishOffer) => Promise<DishOffer>;
  //   update: (dishOffer: UpdateDishOffer) => Promise<DishOffer>;
  //   delete: (id: string) => Promise<void>;
}
