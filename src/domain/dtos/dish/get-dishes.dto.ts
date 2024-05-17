import { z } from "zod";
import { paginationDto } from "../common";

export const getDishesDtoSchema = z.object({
  ...paginationDto.shape,
  idCategory: z.nullable(z.number().int().positive()),
  search: z.nullable(z.string()),
});

export type GetDishesDto = z.infer<typeof getDishesDtoSchema>;
