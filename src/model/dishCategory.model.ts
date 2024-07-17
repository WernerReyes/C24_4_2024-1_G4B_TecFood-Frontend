export interface DishCategoryModel {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export const dishCategoryEmptyState: DishCategoryModel = {
  id: 0,
  name: "",
  createdAt: "" as any as Date,
  updatedAt: "" as any as Date,
};
