import { ZodError, z } from "zod";
import { RoleEnum } from "@/domain/entities";
import { regularExpressions } from "@/presentation/utilities";

export class LoginGoogleUserDto {
  private constructor(
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly email: string,
    public readonly imgUrl: string,
    public readonly isGoogleAccount: boolean,
    public readonly isEmailVerified: boolean,
    public readonly role: RoleEnum,
  ) {}

  public static create(
    data: LoginGoogleUserDto,
  ): [LoginGoogleUserDto?, string[]?] {
    try {
      const validatedData = this.validations.parse(data);
      return [validatedData, undefined];
    } catch (error) {
      if (error instanceof ZodError)
        return [undefined, error.issues.map((issue) => issue.message)];
      throw error;
    }
  }

  private static get validations() {
    const { EMAIL, URL } = regularExpressions;
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
      imgUrl: z.string().refine((value) => URL.test(value), {
        message: "Invalid URL",
      }),
      isGoogleAccount: z.boolean().refine((value) => value === true, {
        message: "This account must be a google account",
      }),
      isEmailVerified: z.boolean().refine((value) => value === true, {
        message: "This account must be verified",
      }),
      role: z.nativeEnum(RoleEnum).optional().default(RoleEnum.ROLE_USER),
    });
  }
}
