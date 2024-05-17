import { z } from "zod";
import { paginationDto } from "../common";

export const getDishesDtoSchema = z.object({
  ...paginationDto.shape,
  idCategory: z.optional(z.number().int().positive()),
});

export type GetDishesDto = z.infer<typeof getDishesDtoSchema>;
