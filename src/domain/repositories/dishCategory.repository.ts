import type { DishCategoryModel, GetDishCategoriesResponse } from "@/model";

export abstract class DishCategoryRepository {
  abstract getAll(): Promise<GetDishCategoriesResponse<DishCategoryModel>>;
  //   create: (dishOffer: CreateDishOffer) => Promise<DishOffer>;
  //   update: (dishOffer: UpdateDishOffer) => Promise<DishOffer>;
  //   delete: (id: string) => Promise<void>;
}
