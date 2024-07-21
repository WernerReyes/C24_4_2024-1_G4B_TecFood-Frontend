import { z } from "zod";
import { dtoValidator } from "@/presentation/utilities";

export class GetDishesWithoutSelectedDishDto {
  constructor(
    public readonly idDish: number,
    public readonly limit: number | null,
  ) {}

  public validate() {
    dtoValidator(this, GetDishesWithoutSelectedDishDto.schema);
  }

  private static get schema() {
    return z.object({
      idDish: z.number({
        message: "dishId is required",
      }),
      limit: z.number().nullable().default(4),
    });
  }
}
