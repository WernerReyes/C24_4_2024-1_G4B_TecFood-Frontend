import { z } from "zod";
import { paginationValidation } from "@/infraestructure/validations";

export const getDishesValidation = z.object({
  ...paginationValidation.shape,
  idCategory: z
    .array(
      z.object({
        idCategory: z.number().refine((n) => n >= 0, {
          message: "idCategory must be a number greater than or equal to 0",
        }),
      }),
    )
    .nullable()
    .default(null),
  priceRange: z
    .object({
      min: z.number().refine((n) => n >= 0, {
        message: "min must be a number greater than or equal to 0",
      }),
      max: z.number().refine((n) => n >= 0, {
        message: "max must be a number greater than or equal to 0",
      }),
    })
    .nullable()
    .default(null),
  search: z.nullable(z.string()).default(null),
});
