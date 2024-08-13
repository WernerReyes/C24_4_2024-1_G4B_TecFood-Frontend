import { z } from "zod";
import { generateEmptyState } from "../presentation/utilities";
import { DishModelSchema } from "./dish.model";
import { UserModelSchema } from "./user.model";

export const CartDishModelSchema = z.object({
  id: z.number(),
  quantity: z.number(),
  dish: DishModelSchema,
  user: UserModelSchema,
});

export type CartDishModel = z.infer<typeof CartDishModelSchema>;

/* <== ( STRUCTURE ) ==>
export const cartEmptyState: CartDishModel = {
  id: 0,
  quantity: 0,
  dish: dishEmptyState,
  user: userEmptyState,
};
*/

export const cartEmptyState =
  generateEmptyState<CartDishModel>(CartDishModelSchema);

