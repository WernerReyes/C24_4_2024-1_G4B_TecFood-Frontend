import { z } from "zod";
import { RoleEnum } from "@/domain/entities";
import { dtoValidator, regularExpressions } from "@/presentation/utilities";
import { AuthDto, type AuthDtoModel, AuthDtoSchema } from "./auth.dto";

const { DNI, PHONE } = regularExpressions;

interface RegisterDtoModel extends AuthDtoModel {
  readonly firstName: string;
  readonly lastName: string;
  readonly dni?: string;
  readonly phoneNumber?: string;
  readonly role?: RoleEnum;
}

export class RegisterDto extends AuthDto implements RegisterDtoModel {
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

  public override validate() {
    dtoValidator(this, RegisterDto.schema);
  }

  public static override get schema(): z.ZodSchema<RegisterDtoModel> {
    return RegisterDtoSchema;
  }
}

const RegisterDtoSchema = z.object({
  firstName: z
    .string({
      message: "Invalid name",
    })
    .min(3, "Name must be at least 3 characters long")
    .max(200, "Name must be at most 200 characters long"),
  lastName: z
    .string()
    .min(3, "Lastname must be at least 3 characters long")
    .max(200, "Lastname must be at most 200 characters long"),
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
  ...AuthDtoSchema.shape,
});
