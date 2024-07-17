import { z, ZodError } from "zod";
import type { DishCategoryModel } from "@/model";

export class CreateDishDto {
  
  constructor(
    public readonly name: string,
    public readonly description: string,
    public readonly price: number,
    public readonly categories: DishCategoryModel[],
    public readonly stock: number,
  ) {}
  
  public validate(): [CreateDishDto?, string[]?] {
    try {
      const validatedData = CreateDishDto.schema.parse(this);
      return [
        new CreateDishDto(
          validatedData.name,
          validatedData.description,
          validatedData.price,
          validatedData.categories,
          validatedData.stock,
        ),
        undefined,
      ];
    } catch (error) {
      if (error instanceof ZodError)
        return [undefined, error.issues.map((issue) => issue.message)];
      throw error;
    }
  }

  public get toFormData(): FormData {
    const formData = new FormData();
    formData.append(
      "createDishDto",
      new Blob(
        [
          JSON.stringify({
            name: this.name,
            description: this.description,
            price: this.price,
            stock: this.stock,
            categoriesId: this.categoriesId,
          }),
        ],
        { type: "application/json" },
      ),
    );

    return formData;
  }

  public get categoriesId(): number[] {
    return this.categories.map((category) => category.id);
  }

  public static get schema() {
    return z.object({
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
            createdAt: z.date({
              message: "Category creation date is required",
            }),
            updatedAt: z.date({
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
  }
}
