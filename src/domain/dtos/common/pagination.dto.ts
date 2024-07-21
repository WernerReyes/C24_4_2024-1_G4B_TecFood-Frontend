import { z } from "zod";

export class PaginationDto {
  protected constructor(
    public readonly page: number = 1,
    public readonly limit: number = 10,
  ) {}

  protected static get schema() {
    return z.object({
      page: z.number().int().positive().default(1),
      limit: z.number().int().positive().default(10),
    });
  }
}
