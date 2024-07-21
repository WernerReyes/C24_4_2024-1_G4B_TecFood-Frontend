import { z } from "zod";
import { dtoValidator } from "@/presentation/utilities";
import { PaginationDto } from "../common";

export class GetDishesDto extends PaginationDto {
  constructor(
    public readonly page: number,
    public readonly limit: number,
    public readonly idCategory: { idCategory: number }[] | null,
    public readonly priceRange: { min: number; max: number } | null,
    public readonly search: string | null,
  ) {
    super(page, limit);
  }

  public validate() {
    dtoValidator(this, GetDishesDto.validations);
  }

  protected static get validations() {
    return z.object({
      idCategory: z
        .array(
          z.object({
            idCategory: z.number().refine((n) => n >= 0, {
              message: "idCategory must be a number greater than or equal to 0",
            }),
          }),
        )
        .nullable()
        .default(null),
      priceRange: z
        .object({
          min: z.number().refine((n) => n >= 0, {
            message: "min must be a number greater than or equal to 0",
          }),
          max: z.number().refine((n) => n >= 0, {
            message: "max must be a number greater than or equal to 0",
          }),
        })
        .nullable()
        .default(null),
      search: z.nullable(z.string()).default(null),
      ...super.schema.shape,
    });
  }
}
