import { RoleEnum } from "@/domain/entities";
import { loginGoogleUserValidation } from "@/infraestructure/validations";
import { ZodError } from "zod";
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
      const validatedData = loginGoogleUserValidation.parse(data);
      return [validatedData, undefined];
    } catch (error) {
      if (error instanceof ZodError)
        return [undefined, error.issues.map((issue) => issue.message)];
      throw error;
    }
  }
}
