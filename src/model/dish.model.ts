import { z } from "zod";
import { StatusEnum } from "@/domain/entities/enums/status.enum";
import { generateEmptyState } from "@/presentation/utilities/generateEmptyState";
import { getStorage } from "@/presentation/utilities/localStorage";
import { DishCategoryModelSchema } from "./dishCategory.model";
import { DishImageModelSchema } from "./dishImage.model";

//* <------------------- Dish Model ------------------->

export const DishModelSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  images: z.array(DishImageModelSchema),
  stock: z.number(),
  status: z.nativeEnum(StatusEnum),
  discountPrice: z.number(),
  discountPercentage: z.number(),
  saleStartDate: z.date(),
  saleEndDate: z.date(),
  isUsed: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
  categories: z.array(DishCategoryModelSchema),
});

export type DishModel = z.infer<typeof DishModelSchema>;

const dishDefaults: Partial<DishModel> = {
  status: StatusEnum.PRIVATE,
};

/* <== ( STRUCTURE ) ==>
export const dishEmptyState: DishModel = {
  id: 0,
  name: "",
  description: "",
  price: 0,
  images: [],
  stock: 0,
  status: StatusEnum.PRIVATE,
  discountPrice: 0,
  discountPercentage: 0,
  saleStartDate: "",
  saleEndDate: "",
  isUsed: false,
  createdAt: "",
  updatedAt: "",
  categories: [],
};
*/

export const dishEmptyState = generateEmptyState<DishModel>(
  DishModelSchema,
  dishDefaults,
);

//* <------------------- Dish Filters ------------------->

export type DishFilters = {
  readonly idCategory: { idCategory: number }[] | null;
  readonly priceRange: { min: number; max: number };
  readonly search: string;
};

export const dishFilterEmptyState: DishFilters = getStorage("dishFilters") || {
  idCategory: null,
  priceRange: {
    min: 0,
    max: 100,
  },
  search: "",
};
