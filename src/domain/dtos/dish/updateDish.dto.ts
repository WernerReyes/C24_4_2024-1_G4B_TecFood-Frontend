import type { DishCategoryModel } from "@/model";
import { dtoValidator } from "@/presentation/utilities";
import { z, ZodSchema } from "zod";
import { DishDto, DishDtoModel, DishDtoSchema } from "./dish.dto";

interface UpdateDishDtoModel extends DishDtoModel {
  readonly dishId: number;
}
export class UpdateDishDto extends DishDto implements UpdateDishDtoModel {
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

  public static get schema(): ZodSchema<UpdateDishDtoModel> {
    return UpdateDishDtoSchema;
  }
}

const UpdateDishDtoSchema = z.object({
  dishId: z.number({
    message: "Dish id is required",
  }),
  ...DishDtoSchema.shape,
});
