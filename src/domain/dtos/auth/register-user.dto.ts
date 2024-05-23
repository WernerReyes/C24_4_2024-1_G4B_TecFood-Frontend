import { ZodError } from "zod";
import { RoleEnum } from "@/domain/entities";
import { registerUserValidation } from "@/infraestructure/validations";

export class RegisterUserDto {
  private constructor(
    public firstName: string,
    public lastName: string,
    public email: string,
    public password: string,
    public dni?: string,
    public phoneNumber?: string,
    public role?: RoleEnum
  ) {}

  public static create(data: RegisterUserDto): [RegisterUserDto?, string[]?] {
    try {
      const validatedData = registerUserValidation.parse(data);
      return [validatedData, undefined];
    } catch (error) {
      if (error instanceof ZodError)
        return [undefined, error.issues.map((issue) => issue.message)];
      throw error;
    }
  }
}