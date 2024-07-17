export interface DishImageModel {
  id: number;
  url: string;
}

export interface DishImageState extends Omit<DishImageModel, "id"> {}