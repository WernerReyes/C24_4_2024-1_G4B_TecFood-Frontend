import { z } from "zod";
import { regularExpressions } from "@/utilities";

const { PASSWORD, DNI, PHONE } = regularExpressions;

export const CreateUserDto = z.object({
  name: z
    .string({
      message: "Invalid name",
    })
    .min(3, {
      message: "Name must be at least 3 characters long",
    })
    .max(200, {
      message: "Name must be at most 200 characters long",
    }),
  lastname: z
    .string()
    .min(3, {
      message: "Lastname must be at least 3 characters long",
    })
    .max(200, {
      message: "Lastname must be at most 200 characters long",
    }),
  email: z.string().email({
    message: "Invalid email",
  }),
  password: z
    .string({
      message: "Invalid password",
    })
    .refine((value) => PASSWORD.test(value), {
      message:
        "Password must contain at least one lowercase, one uppercase, one numeric, and be at least 8 characters long",
    }),
  dni: z.string().refine((value) => DNI.test(value), {
    message: "DNI must be 8 characters long and contain only numbers",
  }),
  phone: z.string().refine((value) => PHONE.test(value), {
    message: "Phone must be 9 characters long and contain only numbers",
  }),
});
