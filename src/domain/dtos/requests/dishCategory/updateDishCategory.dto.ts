import { z } from "zod";
import {
  DishCategoryDto,
  type DishCategoryDtoModel,
  DishCategoryDtoSchema,
} from "./dishCategory.dto";
import { dtoValidator } from "@/presentation/utilities";

interface UpdateDishCategoryDtoModel extends DishCategoryDtoModel {
  readonly id: number;
}

export class UpdateDishCategoryDto
  extends DishCategoryDto
  implements UpdateDishCategoryDtoModel
{
  constructor(
    public readonly id: number,
    public readonly name: string,
  ) {
    super(name);
  }

  public override validate() {
    dtoValidator(this, UpdateDishCategoryDto.schema);
  }

  public static override get schema(): z.ZodSchema<UpdateDishCategoryDtoModel> {
    return UpdateDishCategoryDtoSchema;
  }
}

export const UpdateDishCategoryDtoSchema = z.object({
  id: z
    .number({
      message: "id must be a number",
    })
    .int("id must be an integer")
    .positive("id must be a positive number"),
  ...DishCategoryDtoSchema.shape,
});
