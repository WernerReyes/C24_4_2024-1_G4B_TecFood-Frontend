export interface DishCategoryModel {
  id: number;
  name: string;
}

export interface DishCategoryState extends DishCategoryModel {}

export const dishCategoryEmptyState: DishCategoryState = {
  id: 0,
  name: "",
};
