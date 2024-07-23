import { dtoValidator } from "@/presentation/utilities";
import { z } from "zod";

export class DishCategoryDto {
  constructor(public name: string) {}

  public validate() {
    dtoValidator(this, DishCategoryDto.schema);
  }

  public static get schema() {
    return z.object({
      name: z
        .string({
          message: "Name is required",
        })
        .min(3, {
          message: "Name must be at least 3 characters",
        })
        .max(50, {
          message: "Name must be at most 50 characters",
        }),
    });
  }
}
