export interface DishCategoryEntity {
  idDishCategory: number;
  name: string;
}

export interface GetDishCategoriesResponse {
  message: string;
  dishCategories: DishCategoryEntity[];
}