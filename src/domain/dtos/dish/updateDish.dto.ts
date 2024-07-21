import { z } from "zod";
import type { DishCategoryModel } from "@/model";
import { DishDto } from "./dish.dto";
import { dtoValidator } from "@/presentation/utilities";

export class UpdateDishDto extends DishDto {
  constructor(
    public readonly dishId: number,
    public readonly name: string,
    public readonly description: string,
    public readonly price: number,
    public readonly categories: DishCategoryModel[],
    public readonly stock: number,
  ) {
    super(name, description, price, categories, stock);
  }

  public validate() {
    dtoValidator(this, UpdateDishDto.schema);
  }

  public get toRequestBody(): Record<string, unknown> {
    return {
      dishId: this.dishId,
      name: this.name,
      description: this.description,
      price: this.price,
      categoriesId: this.categoriesId,
      stock: this.stock,
    };
  }

  public static get schema() {
    return z.object({
      dishId: z.number({
        message: "dishId must be a number greater than or equal to 0",
      }),
      ...super.schema.shape,
    });
  }
}
