import { ZodError, ZodType } from "zod";
import { errorMessage } from "./sonnerManager";

export const requestValidator = <T>(dto: T, schema: ZodType<T>): void => {
  try {
     schema.parse(dto);
  } catch (error) {
    if (error instanceof ZodError)
      errorMessage(error.errors.map((error) => error.message));
    throw error;
  }
};
