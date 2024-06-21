import { ZodError, z } from "zod";

export class PaginationDto {
  protected constructor(
    public readonly page: number = 1,
    public readonly limit: number = 10,
  ) {}

  public static create(data: PaginationDto): [PaginationDto?, string[]?] {
    try {
      const validatedData = this.validations.parse(data);
      return [validatedData, undefined];
    } catch (error) {
      if (error instanceof ZodError)
        return [undefined, error.issues.map((issue) => issue.message)];
      throw error;
    }
  }

  protected static get validations() {
    return z.object({
      page: z.number().int().positive().default(1),
      limit: z.number().int().positive().default(10),
    });
  }

}
