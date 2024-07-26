import { z } from "zod";
import { dtoValidator } from "@/presentation/utilities";

type GetDishesWithoutSelectedDishDtoModel = {
  readonly idDish: number;
  readonly limit?: number | null;
};

export class GetDishesWithoutSelectedDishDto
  implements GetDishesWithoutSelectedDishDtoModel
{
  constructor(
    public readonly idDish: number,
    public readonly limit?: number | null,
  ) {}

  public validate() {
    dtoValidator(this, GetDishesWithoutSelectedDishDto.schema);
  }

  private static get schema(): z.ZodSchema<GetDishesWithoutSelectedDishDtoModel> {
    return GetDishesWithoutSelectedDishDtoSchema;
  }
}

const GetDishesWithoutSelectedDishDtoSchema = z.object({
  idDish: z.number({
    message: "dishId is required",
  }),
  limit: z.number().optional().default(4),
});
