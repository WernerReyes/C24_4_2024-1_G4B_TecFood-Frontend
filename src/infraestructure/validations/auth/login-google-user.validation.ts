import { z } from "zod";
import { regularExpressions } from "@/presentation/utilities";
import { RoleEnum } from "@/domain/entities";

const { EMAIL, URL } = regularExpressions;

export const loginGoogleUserValidation = z.object({
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
  isGoogleAccount: z.boolean().refine(value => value === true, {
    message: "This account must be a google account",
  }),
  isEmailVerified: z.boolean().refine(value => value === true, {
    message: "This account must be verified",
  }),
  role: z.nativeEnum(RoleEnum).optional().default(RoleEnum.ROLE_USER),
});