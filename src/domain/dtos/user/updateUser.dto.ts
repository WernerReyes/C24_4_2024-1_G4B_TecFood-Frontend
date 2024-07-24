import { z } from "zod";
import { dtoValidator, regularExpressions } from "@/presentation/utilities";

type UpdateUserDtoModel = {
  readonly firstName: string;
  readonly lastName: string;
  readonly phoneNumber?: string;
  readonly dni?: string;
};

const { DNI, PHONE } = regularExpressions;
export class UpdateUserDto implements UpdateUserDtoModel {
  private constructor(
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly phoneNumber?: string,
    public readonly dni?: string,
  ) {}

  public validate() {
    dtoValidator(this, UpdateUserDto.schema);
  }

  public static get schema(): z.ZodSchema<UpdateUserDtoModel> {
    return UpdateUserDtoSchema;
  }
}

const UpdateUserDtoSchema = z.object({
  firstName: z
    .string()
    .min(3, "Name must be at least 3 characters long")
    .max(60, "Name must be at most 60 characters long"),

  lastName: z
    .string()
    .min(3, "Last name must be at least 3 characters long")
    .max(60, "Last name must be at most 60 characters long"),
  dni: z
    .string()
    .optional()
    .refine((value) => (value ? DNI.test(value) : true), {
      message: "DNI must be 8 characters long and contain only numbers",
    }),
  phoneNumber: z
    .string()
    .optional()
    .refine((value) => (value ? PHONE.test(value) : true), {
      message: "Phone must be 9 characters long and contain only numbers",
    }),
});
