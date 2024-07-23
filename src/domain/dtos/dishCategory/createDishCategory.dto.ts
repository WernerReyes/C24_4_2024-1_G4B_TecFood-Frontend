import { DishCategoryDto } from "./dishCategory.dto";

export class CreateDishCategoryDto extends DishCategoryDto {
  constructor(public readonly name: string) {
    super(name);
  }

  public get toFormData(): FormData {
    const formData = new FormData();
    formData.append(
      "createDishCategoryDto",
      new Blob(
        [
          JSON.stringify({
            name: this.name,
          }),
        ],
        { type: "application/json" },
      ),
    );

    return formData;
  }
}
