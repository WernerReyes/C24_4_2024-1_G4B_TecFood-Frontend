import { dtoValidator, regularExpressions } from "@/presentation/utilities";
import { z } from "zod";

const { DNI, PHONE } = regularExpressions;
export class UpdateUserDto {
  private constructor(
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly phoneNumber?: string,
    public readonly dni?: string,
  ) {}

  public validate() {
    dtoValidator(this, UpdateUserDto.schema);
  }

  public static get schema() {
    return z.object({
      firstName: z
        .string()
        .min(3, {
          message: "Name must be at least 3 characters long",
        })
        .max(60, {
          message: "Name must be at most 60 characters long",
        }),
    
      lastName: z
        .string()
        .min(3, {
          message: "Last name must be at least 3 characters long",
        })
        .max(60, {
          message: "Last name must be at most 60 characters long",
        }),
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
  }
}
