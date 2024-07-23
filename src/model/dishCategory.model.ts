export interface DishCategoryModel {
  id: number;
  name: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export const dishCategoryEmptyState: DishCategoryModel = {
  id: 0,
  name: "",
  imageUrl: "",
  createdAt: "",
  updatedAt: "",
};
