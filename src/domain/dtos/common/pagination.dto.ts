import { paginationValidation } from "@/infraestructure/validations";
import { ZodError } from "zod";

export class PaginationDto {
  protected constructor(
    public readonly page: number = 1,
    public readonly limit: number = 10,
  ) {}

  public static create(object: { [key: string]: any }): [PaginationDto?, string[]?] {
    const { page, limit } = object;
    try {
      const validatedData = paginationValidation.parse({ page, limit });
      return [validatedData, undefined];
    } catch (error) {
      if (error instanceof ZodError)
        return [undefined, error.issues.map((issue) => issue.message)];
      throw error;
    }
  }
}
