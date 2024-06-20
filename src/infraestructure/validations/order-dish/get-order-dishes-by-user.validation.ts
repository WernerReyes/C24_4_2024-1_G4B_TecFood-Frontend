import { z } from "zod";
import { OrderDishStatusEnum } from "@/domain/entities";
import { paginationValidation } from "../common";

export const getOrderDishesByUserValidation = z.object({
  ...paginationValidation.shape,
  status: z.array(
    z.object({
      status: z
        .nativeEnum(OrderDishStatusEnum)
        .refine((n) => Object.values(OrderDishStatusEnum).includes(n), {
          message: `status must be one of the following values: ${Object.values(OrderDishStatusEnum).join(", ")}`,
        }),
    }),
  ),
});
