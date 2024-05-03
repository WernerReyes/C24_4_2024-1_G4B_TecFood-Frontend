import { z } from "zod";
import { regularExpressions } from "@/utilities";
import { RoleEnum } from "@/domain/entities";

const { PASSWORD, DNI, PHONE } = regularExpressions;

export const registerUserDto = z.object({
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
  email: z.string().email({
    message: "Invalid email, It must be a valid email",
  }),
  password: z
    .string({
      message: "Invalid password",
    })
    .refine((value) => PASSWORD.test(value), {
      message: "Password invalid, follow the suggestions and try again",
    }),
  dni: z.string().refine((value) => DNI.test(value), {
    message: "DNI must be 8 characters long and contain only numbers",
  }),
  phoneNumber: z.string().refine((value) => PHONE.test(value), {
    message: "Phone must be 9 characters long and contain only numbers",
  }),
  role: z.nativeEnum(RoleEnum).optional().default(RoleEnum.CLIENT_ROLE),
});

export type RegisterUserDto = z.infer<typeof registerUserDto>;


// first_name VARCHAR(255) NOT NULL ,
//                        last_name VARCHAR(255) NOT NULL ,
//                        phone_number INT(9),
//                        email VARCHAR(255) UNIQUE NOT NULL ,
//                        password VARCHAR(255) NOT NULL ,
//                        dni INT,