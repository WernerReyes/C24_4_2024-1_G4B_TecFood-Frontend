import { z } from "zod";
import { RoleEnum } from "@/domain/entities";
import { dtoValidator, regularExpressions } from "@/presentation/utilities";
import { AuthDto, type AuthDtoModel, AuthDtoSchema } from "./auth.dto";
const { URL } = regularExpressions;

const LETTERS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

interface LoginGoogleDtoModel extends AuthDtoModel {
  readonly firstName: string;
  readonly lastName: string;
  readonly imgUrl: string;
  readonly isGoogleAccount: boolean;
  readonly isEmailVerified: boolean;
  readonly role?: RoleEnum;
}

export class LoginGoogleDto extends AuthDto implements LoginGoogleDtoModel {
  constructor(
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly email: string,
    public readonly imgUrl: string,
    public readonly isGoogleAccount: boolean,
    public readonly isEmailVerified: boolean,
    public readonly role?: RoleEnum,
  ) {
    super(
      email,
      Array.from({ length: 8 }, () => LETTERS[Math.floor(Math.random() * 52)])
        .join("")
        .concat(Math.floor(Math.random() * 1000).toString()),
    );
  }

  protected override validate() {
    dtoValidator(this, LoginGoogleDto.schema);
  }

  public static override get schema(): z.ZodSchema<LoginGoogleDtoModel> {
    return LoginGoogleDtoSchema;
  }
}

const LoginGoogleDtoSchema = z.object({
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
  ...AuthDtoSchema.shape,
});
