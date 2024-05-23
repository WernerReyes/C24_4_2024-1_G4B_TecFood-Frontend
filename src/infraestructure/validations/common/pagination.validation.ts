import { z } from "zod";

export const paginationValidation = z.object({
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().default(10),
});
