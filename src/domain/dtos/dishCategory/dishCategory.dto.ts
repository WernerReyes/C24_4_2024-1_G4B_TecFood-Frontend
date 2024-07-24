import { dtoValidator } from "@/presentation/utilities";
import { z } from "zod";

export type DishCategoryDtoModel = {
  readonly name: string;
};

export class DishCategoryDto implements DishCategoryDtoModel {
  constructor(public name: string) {}

  public validate() {
    dtoValidator(this, DishCategoryDto.schema);
  }

  public static get schema(): z.ZodSchema<DishCategoryDtoModel> {
    return DishCategoryDtoSchema;
  }
}

export const DishCategoryDtoSchema = z.object({
  name: z
    .string({
      message: "Name is required",
    })
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name must be at most 50 characters"),
});
