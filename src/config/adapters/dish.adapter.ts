import type { DishEntity } from "@/domain/entities";
import type { DishModel } from "@/model";
import { dishCategoryAdapter, dishImageAdapter } from "./";
import { convertDateToShortString } from "@/presentation/utilities";
export const dishAdapter = (dishEntity: DishEntity): DishModel => {
  return {
    id: dishEntity.id,
    name: dishEntity.name,
    price: dishEntity.price,
    images: dishEntity.images.map(dishImageAdapter),
    stock: dishEntity.stock,
    description: dishEntity.description,
    status: dishEntity.status,
    discountPrice: dishEntity.discountPrice,
    discountPercentage: dishEntity.discountPercentage,
    saleStartDate: dishEntity.saleStartDate,
    saleEndDate: dishEntity.saleEndDate,
    isUsed: dishEntity.isUsed,
    createdAt: convertDateToShortString(dishEntity.createdAt),
    updatedAt: convertDateToShortString(dishEntity.updatedAt),
    categories: dishEntity.categories.map(dishCategoryAdapter),
  };
};
