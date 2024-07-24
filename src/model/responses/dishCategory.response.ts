export interface CreateDishCategoryResponse<T> {
  message: string;
  dishCategory: T;
}
export interface UpdateDishCategoryResponse<T>
  extends CreateDishCategoryResponse<T> {}

export interface UpdateDishCategoryImageResponse<T>
  extends UpdateDishCategoryResponse<T> {}
export interface GetDishCategoriesResponse<T> {
  message: string;
  dishCategories: T[];
}
