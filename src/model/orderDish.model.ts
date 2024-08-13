import { z } from "zod";
import { OrderDishStatusEnum } from "@/domain/entities";
import { generateEmptyState, getStorage } from "@/presentation/utilities";
import { UserModelSchema } from "./user.model";


//* <------------------- OrderDish -------------------> */

export const OrderDishModelSchema = z.object({
  id: z.number(),
  date: z.date(),
  invoiceReportUrl: z.string().nullable(),
  status: z.nativeEnum(OrderDishStatusEnum),
  total: z.number(),
  user: UserModelSchema,
});

export type OrderDishModel = z.infer<typeof OrderDishModelSchema>;

/* <== ( STRUCTURE ) ==>
export const orderDishEmptyState: OrderDishModel = {
  id: 0,
  date: "" as any as Date,
  status: OrderDishStatusEnum.PENDING,
  total: 0,
  user: userEmptyState,
  invoiceReportUrl: "",
};
*/
const orderDishDefaults: Partial<OrderDishModel> = {
  status: OrderDishStatusEnum.PENDING,
};

export const orderDishEmptyState = generateEmptyState<OrderDishModel>(
  OrderDishModelSchema,
  orderDishDefaults,
);

//* <------------------- OrderDishFilter -------------------> */
export type OrderDishFilter = {
  status: { status: OrderDishStatusEnum }[];
};

export const orderDishFilterEmptyState: OrderDishFilter = getStorage(
  "orderDishFilters",
) || {
  status: [{ status: OrderDishStatusEnum.COMPLETED }],
};
