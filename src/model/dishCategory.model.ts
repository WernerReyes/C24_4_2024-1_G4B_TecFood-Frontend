import { StatusEnum } from "@/domain/entities/enums";
import { generateEmptyState } from "@/presentation/utilities/generateEmptyState";
import { z } from "zod";

export const DishCategoryModelSchema = z.object({
  id: z.number(),
  name: z.string(),
  imageUrl: z.string(),
  status: z.nativeEnum(StatusEnum),
  isUsed: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type DishCategoryModel = z.infer<typeof DishCategoryModelSchema>;

/*  <== ( STRUCTURE ) ==>
export const dishCategoryEmptyState: DishCategoryModel = {
  id: 0,
  name: "",
  imageUrl: "",
  status: StatusEnum.PRIVATE,
  isUsed: false,
  createdAt: "",
  updatedAt: "",
};
*/

export const dishCategoryEmptyState = generateEmptyState<DishCategoryModel>(
  DishCategoryModelSchema,
);
