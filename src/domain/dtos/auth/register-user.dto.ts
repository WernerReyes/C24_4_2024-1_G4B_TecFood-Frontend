import { ZodError, z } from "zod";
import { RoleEnum } from "@/domain/entities";
import { regularExpressions } from "@/presentation/utilities";

export class RegisterUserDto {
  private constructor(
    public firstName: string,
    public lastName: string,
    public email: string,
    public password: string,
    public dni?: string,
    public phoneNumber?: string,
    public role?: RoleEnum,
  ) {}

  public static create(data: RegisterUserDto): [RegisterUserDto?, string[]?] {
    try {
      const validatedData = this.validations.parse(data);
      return [validatedData, undefined];
    } catch (error) {
      if (error instanceof ZodError)
        return [undefined, error.issues.map((issue) => issue.message)];
      throw error;
    }
  }

  public static get validations() {
    const { EMAIL, PASSWORD, DNI, PHONE } = regularExpressions;
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
      email: z.string().refine((value) => EMAIL.test(value), {
        message: "Email invalid, follow the suggestions and try again",
      }),
      password: z
        .string({
          message: "Invalid password",
        })
        .refine((value) => PASSWORD.test(value), {
          message: "Password invalid, follow the suggestions and try again",
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
    });
  }
}
