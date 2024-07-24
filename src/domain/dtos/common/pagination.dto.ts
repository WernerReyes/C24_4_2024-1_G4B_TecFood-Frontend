import { z } from "zod";

export type PaginationDtoModel = {
  readonly page?: number;
  readonly limit?: number;
};

export class PaginationDto implements PaginationDtoModel {
  protected constructor(
    public readonly page: number = 1,
    public readonly limit: number = 10,
  ) {}

  protected static get schema(): z.ZodSchema<PaginationDtoModel> {
    return PaginationDtoSchema;
  }
}

export const PaginationDtoSchema = z.object({
  page: z
    .number()
    .int("Invalid page, it must be an integer number")
    .positive("Invalid page, it must be a positive number")
    .optional()
    .default(1),

  limit: z
    .number()
    .int("Invalid limit, it must be an integer number")
    .positive("Invalid limit, it must be a positive number")
    .optional()
    .default(10),
});
