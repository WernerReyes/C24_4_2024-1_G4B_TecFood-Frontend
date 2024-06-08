import { ZodError } from "zod";
import { updateUserValidation } from "@/infraestructure/validations";
export class UpdateUserDto {
  private constructor(
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly phoneNumber?: string,
    public readonly dni?: string,
  ) {}

  public static create(data: UpdateUserDto): [UpdateUserDto?, string[]?] {
    try {
      const validatedData = updateUserValidation.parse(data);
      return [validatedData, undefined];
    } catch (error) {
      if (error instanceof ZodError)
        return [undefined, error.issues.map((issue) => issue.message)];
      throw error;
    }
  }
}
