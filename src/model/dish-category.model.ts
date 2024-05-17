export interface DishCategory {
  id: number;
  name: string;
}

export interface GetDishCategories {
  message: string;
  dishCategories: DishCategory[];
}

export interface DishCategoryState extends DishCategory {}

export const dishCategoryEmptyState: DishCategoryState = {
  id: 0,
  name: "",
};
