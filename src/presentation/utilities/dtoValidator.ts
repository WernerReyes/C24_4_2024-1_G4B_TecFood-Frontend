import { ZodError, ZodType } from "zod";
import { errorMessage } from "./sonnerManager";

export const dtoValidator = <T>(dto: T, schema: ZodType<any>): void => {
  try {
     schema.parse(dto) as T;
  } catch (error) {
    if (error instanceof ZodError)
      errorMessage(error.errors.map((error) => error.message));
    throw error;
  }
};
