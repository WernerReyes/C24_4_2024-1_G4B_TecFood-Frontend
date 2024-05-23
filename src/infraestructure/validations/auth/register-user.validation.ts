import { z } from "zod";
import { regularExpressions } from "@/presentation/utilities";
import { RoleEnum } from "@/domain/entities";

const { PASSWORD, DNI, PHONE, EMAIL } = regularExpressions;

export const registerUserValidation = z.object({
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
  password: z
    .string({
      message: "Invalid password",
    })
    .refine((value) => PASSWORD.test(value), {
      message: "Password invalid, follow the suggestions and try again",
    }),
  dni: z
    .string()
    .optional()
    .refine((value) => (value ? DNI.test(value) : true), {
      message: "DNI must be 8 characters long and contain only numbers",
    }),
  phoneNumber: z
    .string()
    .optional()
    .refine((value) => (value ? PHONE.test(value) : true), {
      message: "Phone must be 9 characters long and contain only numbers",
    }),
  role: z.nativeEnum(RoleEnum).optional().default(RoleEnum.ROLE_USER),
});