import { z } from "zod";
import { RoleEnum } from "@/domain/entities";
import { dtoValidator, regularExpressions } from "@/presentation/utilities";
import { AuthDto } from "./auth.dto";
const { URL } = regularExpressions;

const LETTERS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

export class LoginGoogleDto extends AuthDto {
  constructor(
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly email: string,
    public readonly imgUrl: string,
    public readonly isGoogleAccount: boolean,
    public readonly isEmailVerified: boolean,
    public readonly role: RoleEnum,
  ) {
    super(
      email,
      Array.from({ length: 8 }, () => LETTERS[Math.floor(Math.random() * 52)])
        .join("")
        .concat(Math.floor(Math.random() * 1000).toString()),
    );
  }

  public validate() {
    dtoValidator(this, LoginGoogleDto.schema);
  }

  public static get schema() {
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
      ...super.schema.shape,
    });
  }
}
