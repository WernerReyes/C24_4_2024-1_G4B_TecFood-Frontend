import { generateEmptyState } from "@/presentation/utilities/generateEmptyState";
import { z } from "zod";

export const DishImageModelSchema = z.object({
  id: z.number(),
  url: z.string(),
});

export type DishImageModel = z.infer<typeof DishImageModelSchema>;

/* <== ( STRUCTURE ) ==>
export const dishImageEmptyState: DishImageModel = {
  id: 0,
  url: "",
};
*/

export const dishImageEmptyState =
  generateEmptyState<DishImageModel>(DishImageModelSchema);
