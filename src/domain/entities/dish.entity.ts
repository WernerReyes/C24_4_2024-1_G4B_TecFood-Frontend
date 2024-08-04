import type { DishCategoryEntity, DishImageEntity } from "./";
import type { StatusEnum } from "./enums";

export interface DishEntity {
  readonly id: number;
  readonly name: string;
  readonly description: string;
  readonly price: number;
  readonly images: DishImageEntity[];
  readonly stock: number;
  readonly status: StatusEnum;
  readonly discountPrice: number;
  readonly discountPercentage: number;
  readonly saleStartDate: Date;
  readonly saleEndDate: Date;
  readonly isUsed: boolean;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly categories: DishCategoryEntity[];
}
