import type { DishCategoryModel } from "@/model";
import { DishDto, type DishDtoModel } from "./dish.dto";

interface CreateDishDtoModel extends DishDtoModel {}

export class CreateDishDto extends DishDto implements CreateDishDtoModel {
  constructor(
    public readonly name: string,
    public readonly description: string,
    public readonly price: number,
    public readonly categories: DishCategoryModel[],
    public readonly stock: number,
  ) {
    super(name, description, price, categories, stock);
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
}
