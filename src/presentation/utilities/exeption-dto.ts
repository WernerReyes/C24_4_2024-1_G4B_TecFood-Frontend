import { ZodSchema } from "zod";

export const exceptionDto = <T>(data: T, schema: ZodSchema<T>): T => {
  const parsedData = schema.safeParse(data);
  if (parsedData.success) return parsedData.data;
  else throw new Error("Invalid, check the schema");
};