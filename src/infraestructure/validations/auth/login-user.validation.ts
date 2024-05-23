import { z } from "zod";
import { regularExpressions } from "@/presentation/utilities";

const { EMAIL, PASSWORD } = regularExpressions;

export const loginUserValidation = z.object({
  email: z.string().refine((value) => EMAIL.test(value), {
    message: "Email invalid, follow the suggestions and try again",
  }),
  password: z.string().refine((value) => PASSWORD.test(value), {
    message: "Password invalid, follow the suggestions and try again",
  }),
});
