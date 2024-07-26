import type { DishCategoryModel } from "@/model";
import { dtoValidator } from "@/presentation/utilities";
import { z, ZodSchema } from "zod";
import { DishRequest, DishRequestModel, DishRequestSchema } from "./dish.request";

interface UpdateDishRequestModel extends DishRequestModel {
  readonly dishId: number;
}
export class UpdateDishRequest extends DishRequest implements UpdateDishRequestModel {
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
    dtoValidator(this, UpdateDishRequest.schema);
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

  public static get schema(): ZodSchema<UpdateDishRequestModel> {
    return UpdateDishRequestSchema;
  }
}

const UpdateDishRequestSchema = z.object({
  dishId: z.number({
    message: "Dish id is required",
  }),
  ...DishRequestSchema.shape,
});
