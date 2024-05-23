import { getDishesValidation } from "@/infraestructure/validations";
import { PaginationDto } from "../common";
import { ZodError } from "zod";

export class GetDishesDto extends PaginationDto {
  private constructor(
    public readonly page: number,
    public readonly limit: number,
    public readonly idCategory: number | null,
    public readonly search: string | null,
  ) {
    super(page, limit);
  }

  public static create(data: GetDishesDto): [GetDishesDto?, string[]?] {
    try {
      const validatedData = getDishesValidation.parse(data);
      return [validatedData, undefined];
    } catch (error) {
      if (error instanceof ZodError)
        return [undefined, error.issues.map((issue) => issue.message)];
      throw error;
    }
  }
}
