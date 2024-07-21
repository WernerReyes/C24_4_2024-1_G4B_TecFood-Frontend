import { z } from "zod";
import { dtoValidator } from "@/presentation/utilities";
import { UploadImageDto } from "../common";

export class UpdateDishImageDto extends UploadImageDto {
  constructor(
    public readonly dishId: number,
    public readonly file: File,
    public readonly imageIdToUpdate: number | null,
  ) {
    super(file);
  }

  public validate() {
    dtoValidator(this, UpdateDishImageDto.schema);
  }

  public get toFormData(): FormData {
    const formData = super.toFormData;
    formData.append(
      "updateDishImageDto",
      new Blob(
        [
          JSON.stringify({
            dishId: this.dishId,
            imageIdToUpdate: this.imageIdToUpdate,
          }),
        ],
        { type: "application/json" },
      ),
    );

    return formData;
  }

  protected static get schema() {
    return z.object({
      dishId: z.number({
        message: "dishId must be a number greater than or equal to 0",
      }),
      imageIdToUpdate: z
        .number({
          message:
            "imageIdToUpdate must be a number greater than or equal to 0",
        })
        .optional()
        .nullable(),
      ...super.fileSchema.shape,
    });
  }
}
