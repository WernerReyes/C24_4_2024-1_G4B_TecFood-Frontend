import { z } from "zod";
import { dtoValidator } from "@/presentation/utilities";
import {
  UploadImageDto,
  UploadImageDtoSchema,
  type UploadImageDtoModel,
} from "../requests/common";

interface UpdateDishImageDtoModel extends UploadImageDtoModel {
  readonly dishId: number;
  readonly imageIdToUpdate: number | null;
}

export class UpdateDishImageDto
  extends UploadImageDto
  implements UpdateDishImageDtoModel
{
  constructor(
    public readonly dishId: number,
    public readonly file: File,
    public readonly imageIdToUpdate: number | null,
  ) {
    super(file);
  }

  public override validate() {
    dtoValidator(this, UpdateDishImageDto.schema);
  }

  public override get toFormData(): FormData {
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

  protected static get schema(): z.ZodSchema<UpdateDishImageDtoModel> {
    return UpdateDishImageDtoSchema;
  }
}

export const UpdateDishImageDtoSchema = z.object({
  dishId: z.number({
    message: "dishId must be a number greater than or equal to 0",
  }),
  imageIdToUpdate: z
    .number({
      message: "imageIdToUpdate must be a number greater than or equal to 0",
    })
    .nullable(),
  ...UploadImageDtoSchema.shape,
});
