import { ZodError, z } from "zod";
import { regularExpressions } from "@/presentation/utilities";

export class LoginUserDto {
  private constructor(
    public readonly email: string,
    public readonly password: string,
  ) {}

  public static create(data: LoginUserDto): [LoginUserDto?, string[]?] {
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
    const { EMAIL, PASSWORD } = regularExpressions;
    return z.object({
      email: z.string().refine((value) => EMAIL.test(value), {
        message: "Email invalid, follow the suggestions and try again",
      }),
      password: z.string().refine((value) => PASSWORD.test(value), {
        message: "Password invalid, follow the suggestions and try again",
      }),
    });
  }
}
