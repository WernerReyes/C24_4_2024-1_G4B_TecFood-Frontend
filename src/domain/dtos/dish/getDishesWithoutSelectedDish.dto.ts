import { ZodError, z } from "zod";

export class GetDishesWithoutSelectedDishDto {
  constructor(
    public readonly idDish: number,
    public readonly limit: number | null,
  ) {}

  public static create(
    dto: GetDishesWithoutSelectedDishDto,
  ): [GetDishesWithoutSelectedDishDto?, string[]?] {
    try {
      const validatedData = this.validations.parse(dto);
      return [validatedData, undefined];
    } catch (error) {
      if (error instanceof ZodError)
        return [undefined, error.issues.map((issue) => issue.message)];
      throw error;
    }
  }

  private static get validations() {
    return z.object({
      idDish: z.number({
        message: "dishId is required",
      }),
      limit: z.number().nullable().default(4),
    });
  }
}
