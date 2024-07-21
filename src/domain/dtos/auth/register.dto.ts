import { RoleEnum } from "@/domain/entities";
import { dtoValidator, regularExpressions } from "@/presentation/utilities";
import { z } from "zod";
import { AuthDto } from "./auth.dto";

const { DNI, PHONE } = regularExpressions;

export class RegisterDto extends AuthDto {
  constructor(
    public firstName: string,
    public lastName: string,
    public email: string,
    public password: string,
    public dni?: string,
    public phoneNumber?: string,
    public role?: RoleEnum,
  ) {
    super(email, password);
  }

  public validate() {
    dtoValidator(this, RegisterDto.schema);
  }

  public static get schema() {
    return z.object({
      firstName: z
        .string({
          message: "Invalid name",
        })
        .min(3, {
          message: "Name must be at least 3 characters long",
        })
        .max(200, {
          message: "Name must be at most 200 characters long",
        }),
      lastName: z
        .string()
        .min(3, {
          message: "Lastname must be at least 3 characters long",
        })
        .max(200, {
          message: "Lastname must be at most 200 characters long",
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
      role: z.nativeEnum(RoleEnum).optional().default(RoleEnum.ROLE_USER),
      ...super.schema.shape,
    });
  }
}
