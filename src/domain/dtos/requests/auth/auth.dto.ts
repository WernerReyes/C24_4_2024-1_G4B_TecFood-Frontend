import { dtoValidator, regularExpressions } from "@/presentation/utilities";
import { z } from "zod";

const { EMAIL, PASSWORD } = regularExpressions;

export type AuthDtoModel = {
  readonly email: string;
  readonly password: string;
}

export class AuthDto implements AuthDtoModel {
  constructor(
    public readonly email: string,
    public readonly password: string,
  ) {}

  protected validate() {
    dtoValidator(this, AuthDto.schema);
  }

  public static get schema(): z.ZodSchema<AuthDtoModel> {
    return AuthDtoSchema;
  }
}

export const AuthDtoSchema = z.object({
  email: z.string().refine((value) => EMAIL.test(value), {
    message: "Email invalid, follow the suggestions and try again",
  }),
  password: z.string().refine((value) => PASSWORD.test(value), {
    message: "Password invalid, follow the suggestions and try again",
  }),
});
