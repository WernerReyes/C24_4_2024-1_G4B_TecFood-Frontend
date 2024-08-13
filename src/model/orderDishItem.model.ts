import { generateEmptyState } from "@/presentation/utilities";
import { z } from "zod";
import { DishModelSchema } from "./dish.model";
import {
  OrderDishModelSchema
} from "./orderDish.model";

const OrderDishItemModelSchema = z.object({
  id: z.number(),
  quantity: z.number(),
  price: z.number(),
  orderDish: OrderDishModelSchema,
  dish: DishModelSchema,
});

export type OrderDishItemModel = z.infer<typeof OrderDishItemModelSchema>;

/* <== ( STRUCTURE ) ==>
export const orderDishItemEmptyState: OrderDishItemModel = {
  id: 0,
  quantity: 0,
  price: 0,
  orderDish: orderDishEmptyState,
  dish: dishEmptyState,
};
*/
export const orderDishItemEmptyState = generateEmptyState<OrderDishItemModel>(
  OrderDishItemModelSchema,
);

