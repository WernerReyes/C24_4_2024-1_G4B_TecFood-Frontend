import { z } from "zod";
import { paginationValidation } from "@/infraestructure/validations";

export const getDishesValidation = z.object({
  ...paginationValidation.shape,
  idCategory: z.nullable(z.number().int().positive()).default(null),
  search: z.nullable(z.string()).default(null),
});

