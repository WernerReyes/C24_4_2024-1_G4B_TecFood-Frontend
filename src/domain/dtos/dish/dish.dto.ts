import { z, ZodSchema } from "zod";
import type { DishCategoryModel } from "@/model";
import { dtoValidator } from "@/presentation/utilities";

export interface DishDtoModel {
  readonly name: string;
  readonly description: string;
  readonly price: number;
  readonly categories: DishCategoryModel[];
  readonly stock: number;
}

export class DishDto implements DishDtoModel {
  constructor(
    public readonly name: string,
    public readonly description: string,
    public readonly price: number,
    public readonly categories: DishCategoryModel[],
    public readonly stock: number,
  ) {}

  public validate() {
    dtoValidator(this, DishDto.schema);
  }

  public get categoriesId(): number[] {
    return this.categories.map((category) => category.id);
  }

  public static get schema(): ZodSchema<DishDtoModel> {
    return DishDtoSchema;
  }
}

export const DishDtoSchema = z.object({
  name: z
    .string({
      message: "Name is required",
    })
    .min(3, "Name must be between 3 and 50 characters")
    .max(50, "Name must be between 3 and 50 characters"),
  description: z
    .string({
      message: "Description is required",
    })
    .min(3, "Description must be between 3 and 255 characters")
    .max(255, "Description must be between 3 and 255 characters"),
  price: z
    .number({
      message: "Price is required",
    })
    .min(0, "Price must be greater than 0")
    .max(999999.99, "Price must be less than 999999.99"),
  categories: z
    .array(
      z.object({
        id: z.number({
          message: "Category id is required",
        }),
        name: z.string({
          message: "Category name is required",
        }),
        imageUrl: z.string({
          message: "Category image is required",
        }),
        createdAt: z.string({
          message: "Category creation date is required",
        }),
        updatedAt: z.string({
          message: "Category update date is required",
        }),
      }),
    )
    .nonempty("At least one category is required and at most 5"),
  stock: z
    .number({
      message: "Stock is required",
    })
    .min(0, "Stock must be greater than 0"),
});
