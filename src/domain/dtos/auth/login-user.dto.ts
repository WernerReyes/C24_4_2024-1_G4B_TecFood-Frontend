import { ZodError } from "zod";
import { loginUserValidation } from "@/infraestructure/validations";

export class LoginUserDto {
  private constructor(
    public readonly email: string,
    public readonly password: string,
  ) {}

  public static create(data: LoginUserDto): [LoginUserDto?, string[]?] {
    try {
      const validatedData = loginUserValidation.parse(data);
      return [validatedData, undefined];
    } catch (error) {
      if (error instanceof ZodError)
        return [undefined, error.issues.map((issue) => issue.message)];
      throw error;
    }
  }
}
