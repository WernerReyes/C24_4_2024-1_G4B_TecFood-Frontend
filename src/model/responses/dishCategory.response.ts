export interface CreateDishCategoryResponse<T> {
  message: string;
  dishCategory: T;
}

export interface GetDishCategoriesResponse<T> {
  message: string;
  dishCategories: T[];
}
